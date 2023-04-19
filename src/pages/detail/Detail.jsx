import React, { useEffect, useState } from 'react'
import './Detail.css'
import Navbar from '../components/navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../components/navbar/footer/Footer'
import Card from '../components/navbar/card/Card'
import { useLocation } from 'react-router-dom'
import axios from 'axios'


const Detail = () => {
    const location = useLocation();
    

    const [books,setBooks] = useState([]);

    const updateDownload = async ()=>{
        try {
            const response = await axios.put(`http://localhost:8000/api/books/updateDownload/${location.state._id}`);
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
       const fetchData = async ()=>{
        try {
            const response = await axios.get('http://localhost:8000/api/books/popular?page=1')
            setBooks(response.data.books);
        } catch (error) {
            console.error(error);
        }
        
       } 

       fetchData()
    },[])
  return (
    <div className='bg-sky-300'>
        <Navbar/>
        <div className="detail w-full bg-sky-300 h-full z-10">
            <div className="container w-full mx-auto  rounded-md px-5 py-8 h-5/6">
                <div className="detailContainer w-5/6 mx-auto bg-white  rounded-md px-5 py-6 h-5/6 mt-5">
                    <div className="detail">
                    <div className="location w-full flex text-center gap-1 text-xs font-bold bg-slate-100 rounded items-center  p-4">
                        <a className='text-blue-500'>Home</a>
                        <p>/</p>
                        <a className='text-blue-500'>{location.state?.category}</a>
                        <p>/</p>
                        <p className='text-xl text-slate-500'>Book Detail</p>
                    </div>
                    <p className='text-slate-700 font-bold m-2'>{location.state?.name}</p>
                    <div className="book gap-5 flex">
                        <img src={location.state?.img ? location.state.img : "https://mmbookshelf.sgp1.cdn.digitaloceanspaces.com/image/C13/2023/04/5b1497bb-e70e-4698-bbfd-fedb473dacab.png"} className='w-32 h-44'  alt="" />
                        <div className="det flex flex-col gap-3">
                            <p className='text-blue-500 font-bold'>{location.state?.name}</p>
                            <p className="author text-xs font-bold">Author -{location.state?.author}</p>
                            <p className="mb text-sm font-medium">10Mb</p>
                            <p className="category bg-blue-400 text-white text-sm max-w-[100px] text-center rounded">{location.state?.category}</p>
                            <p className='text-sm font-semibold'>intro: {location.state.des}</p>
                        </div>
                    </div>
                    <button onClick={()=>updateDownload()} className="download px-3 py-1 mt-2 bg-blue-400 text-white gap-1 rounded hover:bg-blue-500">
                        Download
                    </button>
                    <div className="hr w-11/12 h-0.5 bg-slate-300 m-4 mx-auto"></div>
                    <div className="recommand w-full">
                        <p className='text-2xl font-bold mb-2'>Recommended Books</p>
                        <div className="cards md:flex  flex-wrap  justify-between">
                            {
                                books.map(book =>(
                                    <Card book={book} key={book._id}/>
                                ))
                            }
                            
                        </div>
                    </div>
                </div>
                </div>
                
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Detail
