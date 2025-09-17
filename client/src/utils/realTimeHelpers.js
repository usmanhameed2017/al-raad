// Add item in real time
export const addRealTime = (updaterFunction) => (newItem) => {
    updaterFunction(prev => {
        if(prev.page === 1) 
        {
            return {
                ...prev,
                docs: [newItem, ...prev.docs].slice(0, prev.limit), // prepend
                totalDocs: prev.totalDocs + 1,
                totalPages: Math.ceil((prev.totalDocs + 1) / prev.limit)
            };
        }

        return {
            ...prev,
            totalDocs: prev.totalDocs + 1,
            totalPages: Math.ceil((prev.totalDocs + 1) / prev.limit)
        };
    });
};

// Update item in real time
export const updateRealTime = (updaterFunction) => (updatedItem) => {
    updaterFunction(prev => ({
        ...prev,
        docs: prev.docs.map(item =>
            item._id === updatedItem._id ? updatedItem : item
        )
    }));
};

// Delete item in real time
export const deleteRealTime = (updaterFunction) => (deletedId) => {
    updaterFunction(prev => ({
        ...prev,
        docs: prev.docs.filter(item => item._id !== deletedId),
        totalDocs: prev.totalDocs - 1,
        totalPages: Math.ceil((prev.totalDocs - 1) / prev.limit) || 1
    }));
};