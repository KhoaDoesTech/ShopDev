/* eslint-disable @typescript-eslint/no-explicit-any */
// Login.js
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { LoginDto } from "../interfaces";

const Login = () => {
  // const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginDto>();
  const onSubmit: SubmitHandler<LoginDto> = async (data) => {
    // const response = await login(data);
    console.log({ data });
    // if (response.message === "OK") {
    //   toast.success("Đăng nhập thành công!");
    //   const token = response.metadata.tokens.accessToken;
    //   const shop = response.metadata.shop;
    //   dispatch(setLogin(token));
    //   dispatch(setAccount(shop));
    // } else {
    //   toast.error("Đăng nhập thất bại!");
    // }
  };
  localStorage.setItem("accessToken", "12345678");
  return (
    <div className="flex w-full justify-center items-center">
      <div className="py-12 px-4 sm:px-6 lg:px-8 w-[50vw] rounded-md">
        <div className="space-y-8 p-4 rounded-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Đăng nhập
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto my-8"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email không được để trống.",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Địa chỉ email không hợp lệ.",
                  },
                }}
                render={({ field }: { field: any }) => (
                  <input
                    {...field}
                    className="w-full p-2 border border-gray-300 rounded-sm bg-white text-gray-900 focus:border-sky-500 focus:border-2 focus:outline-none"
                  />
                )}
              />
              <p className="text-red-500 text-xs mt-1">
                {errors?.email && errors?.email.message}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mật khẩu
              </label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Mật khẩu không được để trống.",
                  // minLength: {
                  //   value: 6,
                  //   message: 'Mật khẩu phải chứa ít nhất 6 ký tự.',
                  // },
                  // pattern: {
                  //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  //   message: 'Mật khẩu phải chứa chữ in hoa, in thường, ký tự đặc biệt và số.',
                  // },
                }}
                render={({ field }: { field: any }) => (
                  <input
                    type="password"
                    {...field}
                    className="text-gray-900 w-full p-2 border border-gray-300 rounded-sm bg-white focus:border-sky-500 focus:border-2 focus:outline-none"
                  />
                )}
              />
              <p className="text-red-500 text-xs mt-1">
                {errors?.password && errors?.password.message}
              </p>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 w-full mb-5"
            >
              Đăng nhập
            </button>
          </form>
        </div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default Login;
