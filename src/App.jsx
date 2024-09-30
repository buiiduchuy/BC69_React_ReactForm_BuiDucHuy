import { Button, Form, Input } from "antd"

function App() {

  return (
    <>
      <div className='container mx-auto py-9'>
        <h1 className="text-center text-[50px] bg-gray-600 text-white mb-5">Thông tin sinh viên</h1>
        <div className="w-full">
          <input type="search" placeholder="Tìm sinh viên..." className="border w-full py-2 px-4 rounded-md"/>
        </div>
        <Form>
           <div className="grid md:grid-cols-2 grid-cols-1 gap-[30px] py-5">
              <div className="">
                <label htmlFor="">Mã SV</label>
                <Input/>
              </div>
              <div className="">
                <label htmlFor="">Họ tên</label>
                <Input/>
              </div>
              <div className="">
                <label htmlFor="">Số điện thoại</label>
                <Input/>
              </div>
              <div className="">
                <label htmlFor="">Email</label>
                <Input/>
              </div>
              <div className="w-full">
              <Button className="bg-green-400 text-white">Thêm sinh viên</Button>
              </div>
           </div>
        </Form>
        <div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-600">
                <th className="py-2 px-3 text-white">Mã SV</th>
                <th className="py-2 px-3 text-white">Họ tên</th>
                <th className="py-2 px-3 text-white">Số điện thoại</th>
                <th className="py-2 px-3 text-white">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-2">1</td>
                <td className="py-3 px-2">Nguyễn Văn A</td>
                <td className="py-3 px-2">0987654321</td>
                <td className="py-3 px-2">nva@gmail.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
