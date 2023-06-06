'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

export default function page({ params }) {
    const router = useRouter();
    const handleDelete = () => {

        // code here for deleting
        // ...
        // ...


        // hooks to back to books page after deleting item
        router.push('/books');

    }
    return (
        <div>
            <p>This is a book by its id or name i.e. {params.book_id}</p>
            <button onClick={handleDelete}>vasd</button>
        </div>
    )
}
