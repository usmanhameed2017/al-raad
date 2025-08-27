let setLoadingFn = null;

export const setLoadingFunction = (fn) => {
    setLoadingFn = fn;
};

export const startLoading = () => {
    if(setLoadingFn) setLoadingFn(true);
};

export const stopLoading = () => {
    if(setLoadingFn) setLoadingFn(false);
};