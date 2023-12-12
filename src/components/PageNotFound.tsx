import React from 'react';

const PageNotFound = () => {
    return (
        <div className=" h-[70vh] flex items-center justify-center">
            <div className="text-center">
                <img src="/assets/images/ic_page_not_found.png" alt="" className="object-contain" />
                <h1 className="text-3xl">404 ERROR</h1>
                <h2 className="mt-5">The requested page is not found</h2>
            </div>
        </div>
    );
};
export default PageNotFound;