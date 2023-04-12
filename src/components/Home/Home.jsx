import React, { useState, useRef } from 'react'
import { useCheckMailMutation } from '../services/emailCheck'
import { Button, message, Input, Form } from 'antd';
const Home = () => {
  const [postEmail, { isLoading,isSuccess }] = useCheckMailMutation();
  const [emailData, getEmailData] = useState([]);
 
  const onFinish = async (values) => {
    const HandleEmailData = {
      email: values.email.replace(/,/g, ' ').trim()
    }
    try {
      const res = await postEmail(HandleEmailData);
      getEmailData(res);      
    } catch (error) {
      console.error(error);
    }
  };

  //coppy text arena
  const handleCopy = () => {
    const copyText = document.querySelector("#inputTextArea");
    copyText.select();
    navigator.clipboard.writeText(copyText.value)
      .then(() => {
        message.success('Copied to clipboard!');
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };
  

  //end coppy 
  return (
    <div>
      <div className="container mx-auto">
        <Form onFinish={onFinish} className='py-10'>
          <div className="md:flex">
            <div className="basis-4/12 px-5">
            <h1 className='font-bold text-xl pb-2 text-green-600'>Gmail</h1>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input.TextArea
                  allowClear
                  className="border shadow resize-none w-full"
                  cols={30}
                  rows={10}
                  placeholder="Each email is separated by 1 space or comma ! :)"
                />
              </Form.Item>
              <div className="text-center p-1">
                <Form.Item>
                  <Button
                    className='bg-black text-center font-bold'
                    size='middle'
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                  >
                    Check
                  </Button>
                </Form.Item>
              </div>
            </div>
            <div className="basis-8/12">
              {/* <table className="table-auto w-full ">
                <thead>
                  <tr>
                    <th className='border'>Available Email</th>
                    <th className='border'>Invalid Email</th>
                    <th className='border'>Status</th>
                  </tr>
                </thead>
                <tbody>

               
                  {Array.isArray(emailData.data) &&
                    emailData.data.map((data, index) => (
                      <tr key={index}>
                        <td className={`border px-2 ${data.status === 'Email is valid' ? 'bg-green-100' : ''}`}>
                          {data.status === 'Email is valid' ? data.email : ''}
                        </td>
                        <td className={`border px-2 ${data.status !== 'Email is valid' && data.status !== undefined ? 'bg-red-100' : ''}`}>
                          {data.status !== 'Email is valid' && data.status !== undefined ? data.email : ''}
                        </td>
                        <td className='border px-2'>
                          {data.status !== undefined ? (data.status === 'Email is valid' ? <i className="fas fa-check text-green-500"></i> : <i className="fas fa-times text-red-500"></i>) : ''}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table> */}

              <div className='grid md:grid-cols-2 md:gap-2 px-1'>
                <div>
                <div className='flex justify-between'>  <h1 className='font-bold text-xl pb-2 text-green-600'>Availabe email</h1>
                  <Button onClick={handleCopy}>Copy</Button></div>
                <Input.TextArea
                 id="inputTextArea"
                    className="border shadow resize-none w-full"
                    cols={30}
                    rows={10}
                    
                    value={Array.isArray(emailData.data) && emailData.data.filter(data => data.status === 'Email is valid').map(data => data.email).join('\n') || ''}
                    placeholder="Availabe Email :)"
                  />
                </div>
                <div>
                <h1 className='font-bold text-xl pb-2 text-red-600'>Invalid email</h1>
                  <Input.TextArea
                    className="border shadow resize-none w-full"
                    cols={30}
                    rows={10}
                    
                    value={Array.isArray(emailData.data) && emailData.data.filter(data => data.status !== 'Email is valid').map(data => data.email).join('\n') || ''}
                    placeholder="Invalid Email :)"
                  />
                   </div>
                   <div>
                <h1 className='font-bold text-xl pb-2 text-red-600'>Log</h1>
                  <Input.TextArea
                    className="border shadow resize-none w-full"
                    cols={30}
                    rows={10}
                    
                    value={Array.isArray(emailData.data) && emailData.data.filter(data => data.status !== undefined).map(data => `${data.email} - ${data.status}`).join('\n')}
                    placeholder="Log"
                  />
                   </div>
              </div>

            </div>
          </div>
        </Form>

      </div>
    </div>
  )
}

export default Home