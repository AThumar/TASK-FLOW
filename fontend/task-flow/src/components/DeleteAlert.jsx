// import React from 'react';
// import { HiIdentification } from 'react-icons/hi';

// const DeleteAlert = ({content , onDelete}) => {
//     return(
//         <div>
//             <p className='text-sm'>{content}</p>
//             <div className='fle justify-end mt-6'>
//                 <button 
//                 type='button'
//                 className='flex items-center justify-center gap-1.5 text-xs md:text-sm font-medium text-rose-500 whitespace-nowrap  bg-rose-50 border border-rose-100 rounded-lg px-4 py-2 cursor-pointer '
//                 > Delete</button>
//             </div>
//         </div>
//     )
// }
// export default DeleteAlert;



import React from 'react';

const DeleteAlert = ({ content, onDelete, onCancel }) => {
    return (
        <div>
            <p className='text-sm'>{content}</p>
            {/* FIX: Corrected 'fle' to 'flex' for alignment */}
            <div className='flex justify-end items-center gap-3 mt-6'>
                {/* TIP: Added a cancel button for better UX */}
                <button
                    type='button'
                    onClick={onCancel}
                    className='text-xs md:text-sm font-medium px-4 py-2 rounded-lg'
                >
                    Cancel
                </button>
                <button
                    type='button'
                    // FIX: Added the onClick handler to trigger the delete function
                    onClick={onDelete}
                    className='flex items-center justify-center gap-1.5 text-xs md:text-sm font-medium text-rose-500 whitespace-nowrap bg-rose-50 border border-rose-100 rounded-lg px-4 py-2 cursor-pointer'
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteAlert;