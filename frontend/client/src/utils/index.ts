/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { JwtPayload, OrderItem, OrderObject } from "../interfaces";
import _, { sumBy } from "lodash";
export function getCurrentDateAsString() {
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear());
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    return `${day}${month}${year}${hours}${minutes}${seconds}`;
}
export const getUserIdFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        const decoded: JwtPayload = jwtDecode(token);
        return decoded.userId;
    }
    return ""
}
export function displayCurrencyVND(amount: number) {
    // Check if amount is a valid number
    if (isNaN(amount)) {
        console.error('Invalid number');
        return;
    }

    const options = {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0, // Set the number of decimal places
    };

    // Use toLocaleString to format the number as currency
    return amount.toLocaleString('en-US', options);
}
export function getDayPeriod() {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return 'buổi sáng';
    } else if (currentHour >= 12 && currentHour < 18) {
        return 'buổi chiều';
    } else {
        return 'buổi tối';
    }
}
export function getTheFirstLetter(text: string) {
    // Split the text into words
    const words = text.split(" ");

    // Get the last word
    const lastWord = words[words.length - 1];

    // Get the first letter of the last word
    const firstLetter = lastWord.charAt(0);

    return firstLetter;

}
export function generateRandomColor() {
    // Generate random values for red, green, and blue
    const red = Math.floor(Math.random() * 256); // Random value between 0 and 255
    const green = Math.floor(Math.random() * 256); // Random value between 0 and 255
    const blue = Math.floor(Math.random() * 256); // Random value between 0 and 255

    // Convert the decimal values to hexadecimal
    const redHex = red.toString(16).padStart(2, '0'); // Ensure two digits
    const greenHex = green.toString(16).padStart(2, '0'); // Ensure two digits
    const blueHex = blue.toString(16).padStart(2, '0'); // Ensure two digits

    // Concatenate the hex values to form the color string
    const colorHex = `#${redHex}${greenHex}${blueHex}`;

    return colorHex;
}
export const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;

    return function (this: any, ...args: Parameters<T>) {
        const context = this;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
};
export const createOrderObject = (userId: string, orderItems: OrderItem[], address: string, phone: string) => {
    const order: OrderObject = {
        userId,
        orderItems,
        address,
        phone,
        overallTotalPrice: sumBy(orderItems, 'totalPrice')
    }
    return order
}
export const convertToOrderItem = (array: any[]) => {

    // Grouping by shop
    const groupedByShop = _.groupBy(array, 'product.product_shop');
    const arr2 = _.map(groupedByShop, (items, shop) => {
        let totalPrice = _.sumBy(items, item => item.quantity * item.product.product_price);

        return {
            shop, // Convert shop back to integer if needed
            items: items.map(item => ({ product: item.product, quantity: item.quantity })),
            totalPrice: totalPrice
        };
    });
    return arr2

}
// get ward, district, province

export const getDistrictFromProvinceName = (provincesArray: any[], provinceName: string) => {
    if (!provincesArray) {
        return []
    }
    const selectedProvince = provincesArray.find(province => province.name === provinceName);

    return selectedProvince?.districts;
}
export const getWardFromDistrictName = (districtArray: any[], districtName: string) => {
    if (!districtArray) {
        return []
    }
    const selectedDistrict = districtArray.find(district => district.name === districtName);

    return selectedDistrict?.wards;
}
export const getWardDistrictProvinceData = (provincesArray: any[], provinceName: string, districtName: string) => {
    if (!provinceName || !districtName) {
        return { districts: [], wards: [] }
    }
    const districts = getDistrictFromProvinceName(provincesArray, provinceName);
    const wards = getWardFromDistrictName(districts, districtName);
    return { districts, wards };
};