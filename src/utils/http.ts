import axios, { AxiosResponse, AxiosError } from "axios";

const apiUrl = "https://todoapp-uit.vercel.app"; // Thay thế bằng URL của API bạn muốn gọi
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWJiOWY0NDAzOTE1YWFmNWYwYmYxNyIsImVtYWlsIjoiZXhhbXBsZUBnbWFpbC5jb20iLCJyb2xlIjoiMyIsImlhdCI6MTY5NjMyNzE4MiwiZXhwIjoxNjk2OTMxOTgyfQ.EiOVCXKm113lcEFJ-JePzFJdsHM-9_Am0YP0jvnBhos"; // Thay thế bằng access token của bạn
const userId = "651bb9f4403915aaf5f0bf17";
interface ApiResponse {
  // Định nghĩa các trường dữ liệu bạn mong đợi trả về từ API
  // Ví dụ:
  data: any;
}

export async function getData(): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(
      `${apiUrl}/api/todo/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Trả về dữ liệu từ phản hồi API
    return response.data;
  } catch (error: any) {
    // Xử lý lỗi nếu có
    if (error.response) {
      console.error("Lỗi từ server:", error.response.data);
    } else {
      console.error("Lỗi không thể kết nối đến server:", error.message);
    }
    throw error; // Chuyển lỗi ra ngoài để xử lý ở nơi gọi
  }
}

export async function postData(data: any): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${apiUrl}/api/todo`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json", // Kiểu dữ liệu bạn đang gửi
        },
      }
    );

    // Trả về dữ liệu từ phản hồi API
    return response.data;
  } catch (error: any) {
    // Xử lý lỗi nếu có
    if (error.response) {
      console.error("Lỗi từ server:", error.response.data);
    } else {
      console.error("Lỗi không thể kết nối đến server:", error.message);
    }
    throw error; // Chuyển lỗi ra ngoài để xử lý ở nơi gọi
  }
}

export async function putData(data: any, postId: string): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.put(
      `${apiUrl}/api/todo/${postId}`, // Thay thế 'your-endpoint' bằng endpoint của API bạn muốn gọi
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json", // Kiểu dữ liệu bạn đang gửi
        },
      }
    );

    // Trả về dữ liệu từ phản hồi API
    return response.data;
  } catch (error: any) {
    // Xử lý lỗi nếu có
    if (error.response) {
      console.error("Lỗi từ server:", error.response.data);
    } else {
      console.error("Lỗi không thể kết nối đến server:", error.message);
    }
    throw error; // Chuyển lỗi ra ngoài để xử lý ở nơi gọi
  }
}

export async function deleteData(postId: string): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.delete(
      `${apiUrl}/api/todo/${postId}`, // Thay thế 'your-endpoint' bằng endpoint của API bạn muốn gọi
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Trả về dữ liệu từ phản hồi API
    return response.data;
  } catch (error: any) {
    // Xử lý lỗi nếu có
    if (error.response) {
      console.error("Lỗi từ server:", error.response.data);
    } else {
      console.error("Lỗi không thể kết nối đến server:", error.message);
    }
    throw error; // Chuyển lỗi ra ngoài để xử lý ở nơi gọi
  }
}

export async function postUser(data: any): Promise<ApiResponse> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${apiUrl}/api/users`,
      data,
      {
        headers: {
          "Content-Type": "application/json", // Kiểu dữ liệu bạn đang gửi
        },
      }
    );

    // Trả về dữ liệu từ phản hồi API
    return response.data;
  } catch (error: any) {
    // Xử lý lỗi nếu có
    if (error.response) {
      console.error("Lỗi từ server:", error.response.data);
    } else {
      console.error("Lỗi không thể kết nối đến server:", error.message);
    }
    throw error; // Chuyển lỗi ra ngoài để xử lý ở nơi gọi
  }
}
