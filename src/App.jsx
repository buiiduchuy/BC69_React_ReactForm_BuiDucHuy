import { Button, Input } from "antd"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4} from "uuid"

function App() {

  const [showBtnUpdate , setShowBtnUpdate] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({mode: 'all'})

  const [danhSachSV , setDanhSachSV] = useState([])
  const onSubmit = (data) => {
    setDanhSachSV((oldSV)=> [...oldSV , data])
    reset()
  }

  const [DanhSachSvSearch , setDanhSachSvSearch] = useState([])

  const handleSearch = (e)=> {
    const {value} = e.target
    console.log("value: ", value);
    if(value) {
      const list = danhSachSV.filter((item)=>(
        item.masv.trim().includes(value.trim())
      ))
      setDanhSachSvSearch(list)
    }else {
      setDanhSachSvSearch([])
    }
  }

  const handleDelete = (id)=> {
    const newDanhSachSV = danhSachSV.filter((item)=>(
      item.masv !== id
    ))
    setDanhSachSV(newDanhSachSV)
  }

  const handleEdit = (item)=> {
    for(let i in item) {
      setValue(`${i}`,`${item[i]}`)
    }
    setShowBtnUpdate(true)
  }

  const handleCancel = ()=> {
    setShowBtnUpdate(false)
    reset()
  }
  
  
  return (
    <>
      <div className='container mx-auto py-9'>
        <h1 className="text-center text-[50px] bg-gray-600 text-white mb-5">Thông tin sinh viên</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
           <div className="grid md:grid-cols-2 grid-cols-1 gap-[30px] py-5">
              <div className="">
                <label htmlFor="">Mã SV<span className="text-red-500 text-[15px] ms-1">*</span></label>
                <input placeholder="Mã sinh viên" name="masv" type="number" {...register("masv",
                  {
                    required: {
                      value: true,
                      message: "Không được để trống"
                    },
                    minLength: {
                      value: "3",
                      message: "Ít nhất 3 ký tự"
                    }
                  })
                  } className="w-full border rounded-md py-2 px-5"/>
                {errors.masv && <span className="text-red-400">{errors.masv.message}</span>}
              </div>
              <div className="">
                <label htmlFor="">Họ tên<span className="text-red-500 text-[15px] ms-1">*</span></label>
                <input placeholder="Họ tên" name="hoten" {...register("hoten",{
                  required: {
                      value: true,
                      message: "Không được để trống"
                    },
                })} className="w-full border rounded-md py-2 px-5"/>
                {errors.hoten && <span className="text-red-400">{errors.hoten.message}</span>}
              </div>
              <div className="">
                <label htmlFor="">Số điện thoại<span className="text-red-500 text-[15px] ms-1">*</span></label>
                <input placeholder="Số điện thoại" name="sodt" type="number" {...register("sodt",{
                  required: {
                      value: true,
                      message: "Không được để trống"
                  },
                  minLength: {
                    value: 10,
                    message: "Ít nhất 10 ký tự"
                  },
                  maxLength: {
                    value: 11,
                    message: "Tối đa 11 ký tự"
                  }
                })} className="w-full border rounded-md py-2 px-5"/>
                {errors.sodt && <span className="text-red-400">{errors.sodt.message}</span>}
              </div>
              <div className="">
                <label htmlFor="">Email<span className="text-red-500 text-[15px] ms-1">*</span></label>
                <input placeholder="email" name="email" {...register("email",{
                  required: {
                      value: true,
                      message: "Không được để trống"
                    },
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                    message: "Vui lòng nhập đúng định dạng email"
                  }
                })} className="w-full border rounded-md py-2 px-5"/>
                {errors.email && <span className="text-red-400">{errors.email.message}</span>}
              </div>
              <div className="w-full">
              {
                showBtnUpdate ? (
                  <>
                  <input type="submit" 
                  className="bg-blue-500 hover:bg-white hover:text-blue-500 text-white px-5 py-2 rounded-md border border-blue-400 cursor-pointer transition-all"
                  value={"Cập nhật sinh viên"}/>

                  <input type="submit" 
                  className="bg-orange-500 hover:bg-white hover:text-orange-500 text-white px-5 py-2 rounded-md border border-orange-500 cursor-pointer transition-all ms-2"
                  value={"Huỷ cập nhật"}
                  onClick={handleCancel}
                  />
                  </>
                ) : (
                  <input type="submit" className="bg-green-400 hover:bg-white hover:text-green-400 text-white px-5 py-2 rounded-md border border-green-400 cursor-pointer transition-all" value={"Thêm sinh viên"}/>
                )
              }
              </div>
           </div>
        </form>
        <div className="w-full my-9">
          <input 
          type="search" placeholder="Tìm mã sinh viên..." 
          className="border w-full py-2 px-4 rounded-md"
          onChange={(e)=>handleSearch(e)}
          />
        </div>
        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-600">
                <th className="py-2 px-3 text-white">Mã SV</th>
                <th className="py-2 px-3 text-white">Họ tên</th>
                <th className="py-2 px-3 text-white">Số điện thoại</th>
                <th className="py-2 px-3 text-white">Email</th>
                <th className="py-2 px-3 text-white">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {
                DanhSachSvSearch.length !== 0 ? (
                  DanhSachSvSearch.map((item)=>(
                    <tr className="border-b" key={uuidv4()}>
                      <td className="py-3 px-2">{item.masv}</td>
                      <td className="py-3 px-2">{item.hoten}</td>
                      <td className="py-3 px-2">{item.sodt}</td>
                      <td className="py-3 px-2">{item.email}</td>
                      <td className="text-center">
                        <Button
                          className="" danger 
                          onClick={()=>handleDelete(item.masv)}
                          >Xoá</Button>
                        <Button 
                          className="boder border-orange-400 text-orange-400 ms-1"
                          onClick={()=>handleEdit(item)}
                        >Sửa</Button>
                      </td>
                    </tr>
                  ))
                ): (
                  danhSachSV.map((item)=> (
                    <tr className="border-b" key={uuidv4()}>
                      <td className="py-3 px-2">{item.masv}</td>
                      <td className="py-3 px-2">{item.hoten}</td>
                      <td className="py-3 px-2">{item.sodt}</td>
                      <td className="py-3 px-2">{item.email}</td>
                      <td className="text-center">
                        <Button
                          className="" danger 
                          onClick={()=>handleDelete(item.masv)}
                          >Xoá</Button>
                        <Button 
                          className="boder border-orange-400 text-orange-400 ms-1"
                          onClick={()=>handleEdit(item)}
                        >Sửa</Button>
                      </td>
                    </tr>
                  ))
                )
                
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
