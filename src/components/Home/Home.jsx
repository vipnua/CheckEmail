import React, { useState, useRef } from 'react'
import { useCheckMailMutation } from '../services/emailCheck'
import { useForm } from 'react-hook-form'
const { TextArea } = Input;
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Button, message,Input,Form } from 'antd';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const Home = () => {
  const { register, handleSubmit } = useForm();
  const [postEmail, { isLoading }] = useCheckMailMutation();
  const [emailData, getEmailData] = useState([]);
  const tdRefs = useRef([]);
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  //coppy 
  const [messageApi, contextHolder] = message.useMessage();
  const handleCopy = () => {
    // Lấy ra toàn bộ giá trị của các thẻ td trong cột "Available email"
    const values = tdRefs.current.filter((_, i) => i % 3 === 0)
      .map((td) => td.textContent.trim())
      .filter((text) => text !== '')
      .join(', ');
    // Copy giá trị vào clipboard
    navigator.clipboard.writeText(values);
  
    // Hiển thị thông báo khi sao chép thành công
    message.success('Copied!');
  };

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
  
  return (
    <div>
      <div className="container mx-auto">

      <Form onFinish={onFinish} className='py-10'>
        <div className="flex">
          <label htmlFor="" className='font-bold'>Email:</label>
          <div className="basis-4/12 px-5">
            <Form.Item   
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input.TextArea
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
                  Submit
                </Button>
              </Form.Item>
            </div>
          </div>
          <div className="basis-8/12">
            <table className="table-auto w-full ">
              <thead>
                <tr>
                  <th className='border relative'>Available email <button className='absolute right-0 px-1 rounded-sm bg-green-400 top-1/2 transform -translate-y-1/2' onClick={handleCopy}>copy</button></th>
                  <th className='border'>Invalid email</th>
                  <th className='border'>Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(emailData.data) &&
                  emailData.data.map((data, index) => (
                    <tr key={index}>
                      <td className='border px-2 ' ref={(el) => tdRefs.current[index * 3] = el}>
                        {data.status === 'Email is valid' ? data.email : ''}
                      </td>
                      <td className='border px-2 ' ref={(el) => tdRefs.current[index * 3 + 1] = el}>
                        {data.status !== 'Email is valid' && data.status !== undefined ? data.email : ''}
                      </td>
                      <td className='border px-2' ref={(el) => tdRefs.current[index * 3 + 2] = el}>
                        {data.status !== undefined ? data.status : ''}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Form>

      </div>
    </div>
  )
}

export default Home