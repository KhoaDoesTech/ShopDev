import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormItem } from "react-hook-form-antd";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { UserProfileForm } from "../interfaces";
import HomeLayout from "../layouts/HomeLayout";
import { accountSelector } from "../store/reducer/auth";
import {
  getDistrictFromProvinceName,
  getWardDistrictProvinceData,
  getWardFromDistrictName,
} from "../utils";
import { updateUser, useFindUserById } from "../api/services/userService";

const profileSchema = yup.object().shape({
  name: yup.string().required("Tên không được để trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  phone: yup.string().required("Số điện thoại không được để trống"),
  address: yup.object().shape({
    detailAddress: yup
      .string()
      .required("Địa chỉ chi tiết không được để trống"),
    ward: yup.string().required("Vui lòng nhập xã/phường của bạn"),
    district: yup.string().required("Vui lòng nhập quận/huyện của bạn"),
    province: yup.string().required("Vui lòng nhập tỉnh/thành phố của bạn"),
  }),
});
const UserProfile = () => {
  const account = useSelector(accountSelector);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserProfileForm>({
    resolver: yupResolver(profileSchema),
  });
  const [canEdit, setCanEdit] = useState(false);
  const [provinceData, setProvinceData] = useState(null);
  const { data, isLoading } = useFindUserById(account._id);
  const [loading, setLoading] = useState(false);
  const values = getValues();
  watch();
  const { wards, districts } = getWardDistrictProvinceData(
    provinceData,
    getValues("address.province"),
    getValues("address.district")
  );
  useEffect(() => {
    if (!isLoading) {
      setValue("name", data.name);
      setValue("email", data.email);
      setValue("phone", data.phone);
      setValue("address.detailAddress", data?.address?.detailAddress ?? "");
      setValue("address.province", data?.address?.province ?? "");
      setValue("address.district", data?.address?.district ?? "");
      setValue("address.ward", data?.address?.ward ?? "");
    }
  }, [data, isLoading]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("province.json");
        console.log({ response });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProvinceData(data);
      } catch (error) {
        console.error("There was a problem fetching the data:", error);
      }
    };

    fetchData();
  }, []);

  const handleProvinceChange = (value) => {
    const province = provinceData.find((item) => item.name === value);
    setValue("address.province", province.name);
  };

  const handleDistrictChange = (value) => {
    const districts = getDistrictFromProvinceName(provinceData, province);
    const district = districts.find((item) => item.name === value);
    console.log({ district });
    setValue("address.district", district.name);
  };
  const handleWardChange = (value) => {
    const ward = wards.find((item) => item.name === value);
    setValue("address.ward", ward.name);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  console.log(errors);
  const onSubmit = async (data) => {
    messageApi.open({
      key: "update-profile",
      type: "loading",
      content: "Đang xử lý...",
    });
    const response = await updateUser(account._id, data);
    if (response.user) {
      messageApi.open({
        key: "update-profile",
        type: "success",
        content: "Cập nhật thành công!",
        duration: 4,
      });
    }
    // messageApi
  };
  return (
    <HomeLayout>
      {contextHolder}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-auto my-4 max-w-[50vw]">
        <h1 className="text-2xl uppercase font-bold text-gray-800 border-l-4 border-l-orange-500 pl-4">
          Thông tin người dùng
        </h1>
        <hr className="my-4" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Tên
            </label>
            <FormItem control={control} name="name">
              <Input size="large" readOnly={!canEdit} />
            </FormItem>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <FormItem control={control} name="email">
              <Input size="large" readOnly={!canEdit} />
            </FormItem>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Số điện thoại
            </label>
            <FormItem control={control} name="phone">
              <Input size="large" readOnly={!canEdit} />
            </FormItem>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Địa chỉ{" "}
              <span className="italic font-normal text-gray-400">
                (Số nhà, tên đường hoặc thôn, ấp)
              </span>
            </label>
            <FormItem control={control} name="address.detailAddress">
              <Input size="large" readOnly={!canEdit} />
            </FormItem>
            <div className="grid grid-cols-3 gap-x-2 my-2">
              <FormItem control={control} name="address.province">
                <Select
                  size="large"
                  showSearch
                  placeholder="Tỉnh/Thành phố"
                  optionFilterProp="children"
                  onChange={handleProvinceChange}
                  filterOption={filterOption}
                  options={provinceData?.map((province) => ({
                    value: province.name,
                    label: province.name,
                  }))}
                />
              </FormItem>
              <FormItem control={control} name="address.district">
                <Select
                  size="large"
                  showSearch
                  placeholder="Quận/Huyện"
                  optionFilterProp="children"
                  onChange={handleDistrictChange}
                  filterOption={filterOption}
                  options={getDistrictFromProvinceName(
                    provinceData,
                    getValues("address.province")
                  )?.map((district) => ({
                    value: district.name,
                    label: district.name,
                  }))}
                />
              </FormItem>
              <FormItem control={control} name="address.ward">
                <Select
                  size="large"
                  showSearch
                  placeholder="Xã/Phường"
                  optionFilterProp="children"
                  onChange={handleWardChange}
                  filterOption={filterOption}
                  options={getWardFromDistrictName(
                    getDistrictFromProvinceName(
                      provinceData,
                      getValues("address.province")
                    ),
                    getValues("address.district")
                  )?.map((ward) => ({
                    value: ward.name,
                    label: ward.name,
                  }))}
                />
              </FormItem>
            </div>
          </div>
          <div>
            {!canEdit && (
              <button
                className="bg-sky-600 rounded-md p-2 text-white w-full"
                onClick={() => setCanEdit(true)}
              >
                Chỉnh Sửa
              </button>
            )}
            {canEdit && (
              <div className="flex items-center gap-x-4 w-full">
                <button
                  className="bg-red-600 rounded-md p-2 text-white flex-grow"
                  onClick={() => setCanEdit(false)}
                >
                  Huỷ thay đổi
                </button>
                <button
                  className="bg-sky-600 rounded-md p-2 text-white flex-grow"
                  type="submit"
                >
                  Cập nhật
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </HomeLayout>
  );
};

export default UserProfile;
