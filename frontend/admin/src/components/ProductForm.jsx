import { message } from "antd";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { clothSize } from '../constants';
import storage from "../firebase";
import { createNewProduct, updateProduct, publishProduct } from '../services/product';
import { getCurrentDateAsString } from '../utils';
const ProductForm = ({ record, isEditForm, methods }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { handleSubmit, control, register, getValues, watch, reset, setValue } = useForm({
        defaultValues: null
    });
    const values = getValues();
    watch();
    const handleReset = () => {
        reset();
    };
    useEffect(() => {
        if (record && !isEditForm) {
            reset()
        } else if (record) {
            for (const [key, value] of Object.entries(record)) {
                setValue(key, value);
            }
        }
    }, [record, isEditForm])
    console.log({ record, values, isEditForm })
    const onSubmit = (data) => {
        const key = 'creating';
        messageApi.open({
            key,
            type: 'loading',
            content: 'Đang xử lý...',
            duration: 3
        });
        const { product_thumb } = data;
        const storageRef = ref(storage, `/products/product-${getCurrentDateAsString()}`);
        const uploadTask = uploadBytesResumable(storageRef, product_thumb);
        new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    // update progress
                },
                (err) => {
                    console.log(err);
                    reject(err);
                },
                async () => {
                    try {
                        if (isEditForm) {
                            var url = await getDownloadURL(uploadTask.snapshot.ref)
                            // var url = record.product_thumb
                        }
                        else {
                            var url = await getDownloadURL(uploadTask.snapshot.ref)
                        }
                        console.log({ url })
                        const product = { ...data, product_thumb: url }
                        if (url) {
                            console.log({product})
                            const response = isEditForm ? await updateProduct(product._id, product) : await createNewProduct(product)
                            console.log({ response })
                            resolve(url);
                            if (response.statusText === "OK") {
                                const keyNoti = 'notify'
                                messageApi.open({
                                    keyNoti,
                                    type: 'success',
                                    content: isEditForm ? 'Cập nhật sản phẩm thành công' : 'Tạo sản phẩm mới thành công!',
                                    duration: 3,
                                });
                                if (!isEditForm) {
                                    const publishResponse = await publishProduct(response.data.metadata._id, product)
                                    console.log({ publishResponse })
                                    reset()
                                }
                                methods.setModalOpen(false)
                            }
                        }
                    }
                    catch (error) {
                        console.log("Error getting download url")
                        reject(error);
                    }
                }
            );
        })
    };

    function renderType() {
        const category = getValues("product_type");
        switch (category) {
            case "Electronics": return <div class="w-full flex gap-x-4 items-center">
                <div className='w-full'>
                    <label>Hãng</label>
                    <input
                        type="text"
                        id="product_attributes.manufacturer"
                        name="product_attributes.manufacturer"
                        {...register('product_attributes.manufacturer', { required: true, min: 1 })}
                        className="p-2 border rounded-md w-full"
                    />
                </div>

                <div className='w-full'>

                    <label>Dòng</label>
                    <input
                        type="text"
                        id="product_attributes.model"
                        name="product_attributes.model"
                        {...register('product_attributes.model', { required: true, min: 1 })}
                        className="p-2 border rounded-md w-full"
                    />
                </div>
                <div className='w-full'>

                    <label>Màu sắc</label>
                    <input
                        type="text"
                        id="product_attributes.color"
                        name="product_attributes.color"
                        {...register('product_attributes.color', { required: true, min: 1 })}
                        className="p-2 border rounded-md w-full"
                    />
                </div>

            </div>;;
            case "Furniture": return <div class="w-full flex gap-x-4 items-center">

            </div>;
            case "Clothes": return <div class="w-full flex gap-x-4 items-center">
                <div className='w-full'>
                    <label>Nhãn hàng</label>
                    <input
                        type="text"
                        id="brand"
                        name="product_attributes.brand"
                        {...register('product_attributes.brand', { required: true, min: 1 })}
                        className="p-2 border rounded-md w-full"
                    />
                </div>

                <div className='w-full'>

                    <label>Kích thước</label>
                    <Controller
                        name="product_attributes.size"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <select id="sizeSelect" {...field} className="p-2 border rounded-md w-full">
                                {
                                    clothSize.map((item, index) => <option value={item} key={index}>{item}</option>)
                                }
                            </select>
                        )}
                    />
                </div>
                <div className='w-full'>

                    <label>Chất liệu</label>
                    <input
                        type="text"
                        id="product_attributes.material"
                        name="product_attributes.material"
                        {...register('product_attributes.material', { required: true, min: 1 })}
                        className="p-2 border rounded-md w-full"
                    />
                </div>

            </div>;
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
            {contextHolder}
            <label htmlFor="product_name" className="block text-sm font-medium text-gray-600">
                Tên sản phẩm:
            </label>
            <input
                type="text"
                id="product_name"
                name="product_name"
                {...register('product_name', { required: true })}
                className="mt-1 p-2 border rounded-md w-full"
            />

            <label htmlFor="description" className="block text-sm font-medium text-gray-600 mt-4">
                Mô tả:
            </label>
            <textarea
                id="description"
                name="product_description"
                {...register('product_description', { required: true })}
                className="mt-1 p-2 border rounded-md w-full"
                rows="4"
            />

            <label htmlFor="quantity" className="block text-sm font-medium text-gray-600 mt-4">
                Số lượng:
            </label>
            <input
                type="number"
                id="quantity"
                name="product_quantity"
                {...register('product_quantity', { required: true, min: 1 })}
                className="mt-1 p-2 border rounded-md w-full"
            />

            <label htmlFor="price" className="block text-sm font-medium text-gray-600 mt-4">
                Giá:
            </label>
            <input
                type="number"
                id="price"
                name="product_price"
                {...register('product_price', { required: true, min: 0.01 })}
                className="mt-1 p-2 border rounded-md w-full"
            />
            <label htmlFor="price" className="block text-sm font-medium text-gray-600 mt-4">
                Loại:
            </label>
            <Controller
                name="product_type"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <select id="categorySelect" {...field} className="mt-1 p-2 border rounded-md w-full">
                        <option value="">-- Select --</option>
                        <option value="Electronics">Điện tử</option>
                        <option value="Clothes">Quần áo</option>
                        <option value="Furniture">Nội thất</option>
                    </select>
                )}
            />
            {renderType()}
            <label htmlFor="image" className="block text-sm font-medium text-gray-600 mt-4">
                Tải ảnh lên:
            </label>
            <Controller
                name="product_thumb"
                control={control}
                render={({ field }) => (
                    <input type="file" onChange={(e) => field.onChange(e.target.files[0])} className="mt-1 p-2" />
                )}
                rules={{ required: true }}
            />
            <div className="flex justify-center items-center w-full gap-x-4">
                <input
                    type="submit"
                    value="Submit"
                    className="block mx-auto w-[80%] mt-4 bg-gray-800 text-white text-xl p-2 rounded-md cursor-pointer hover:bg-gray-600"
                />
                <button onClick={handleReset}
                    className="block mx-auto w-[20%] mt-4 bg-red-800 text-white text-xl p-2 rounded-md cursor-pointer hover:bg-red-600"
                >Reset</button>
            </div>
        </form>
    );
};

export default ProductForm;
