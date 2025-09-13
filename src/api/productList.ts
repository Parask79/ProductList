
export const productList = async(page:string, skip:string) => {
    try {
        const response = await fetch(`https://dummyjson.com/products?limit=${page}&skip=${skip}`, {
            method: 'GET',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product list:', error);
        throw error;
    }   
};

