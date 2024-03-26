import { Tag } from "antd";
import { jwtDecode } from "jwt-decode";
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
  if(token){
    const decoded = jwtDecode(token);
    return decoded.userId;
  }
  return ""
}
export const getShopNameFromToken = () => {
  const token = localStorage.getItem("accessToken");
  if(token){
    const decoded = jwtDecode(token);
    return decoded.userId;
  }
  return ""
}
export function displayCurrencyVND(amount) {
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
export function renderStatusTags(status) {
  switch (status.toLowerCase()) {
      case 'pending':
         return <Tag color="#f59842">Đang chờ duyệt</Tag>
      case 'confirmed':
        return <Tag color="#c24915">Đã xác nhận</Tag>
      case 'shipped':
        return <Tag color="#007bff">Đang giao hàng</Tag>
      case 'cancelled':
        return <Tag color="#ff000d">Đã hủy</Tag>
      case 'delivered':
        return <Tag color="#6aff00">Đã giao hàng thành công</Tag>
      default:
        return <Tag color="#f59842">Đang chờ duyệt</Tag>
  }
}
export function convertTimestampToFormattedString(timestamp) {
  const date = new Date(timestamp);

  // Adjust the date to GMT+7
  date.setHours(date.getHours());

  // Format the date
  const formattedDate = date.toLocaleString('en-GB', {
    timeZone: 'Asia/Bangkok', // GMT +7
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return formattedDate;
}
export const calculateTotalQuantity = (orderItems) => {
  const totalQuantity = orderItems.reduce((sum, orderItem) => {
    const orderItemQuantity = orderItem.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
    return sum + orderItemQuantity;
  }, 0);
  return totalQuantity;
}