export function getItem<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Lỗi khi lấy giá trị từ Local Storage:", error);
    return null;
  }
}
