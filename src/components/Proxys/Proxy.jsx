import React, { useState, useEffect } from 'react'
import { Button, Checkbox, Form, Input, Table } from 'antd';
import { Radio } from 'antd';
import { useCheckProxyHttpMutation, useCheckProxySocks5Mutation } from '../services/proxyCheck';
import { isValidProxyFormat } from '../helper/function'
import { message } from 'antd';
const Proxy = () => {
  const [checkProxyHttp, { isLoadingHttps }] = useCheckProxyHttpMutation();
  const [checkProxySocks5, { isLoadingSocks5 }] = useCheckProxySocks5Mutation();  // Rename the Proxy function to checkProxy for clarity
  const [data, setData] = useState([]);
  const [loadings, setLoadings] = useState([]);
  const handleSubmit = async (values) => {
    try {
      setData([]);
      const option = values.Option;
      const proxyStr = values.proxies;
      const proxies = proxyStr.split(/[\n\s]+/); // Split proxies by newline or whitespace

// Map through proxies and create an array of promises
const proxyRequests = proxies.map(async (proxy, i) => {
  if (!proxy) return null; // Skip empty proxies
  console.log('proxy', proxy);
  let validProxy = isValidProxyFormat(proxy);
  console.log(validProxy);
  if (!validProxy) {
    const newData = {
      key: i,
      option: 'Invalid Proxy',
      ip_address: proxy,
      isp: 'N/A',
      org: 'N/A',
      connection_type: 'N/A',
      asn: 'N/A',
      address: 'N/A',
      response_time: 'N/A',
      error: 'Invalid proxy format'
    };
    setData(prevState => [...prevState, newData]);
    return null;
  }
  // Call checkProxy with each proxy based on Option
  let result;
  if (option === 'Http/s') {
    result = checkProxyHttp({ proxy });
  } else {
    result = checkProxySocks5({ proxy });
  }

  return result;
});

// Loop through promises and execute them one at a time
const results = [];
for (const request of proxyRequests) {
  const result = await Promise.race([request]);
  results.push(result);
}

// Loop through results and add data to state
results.forEach((result, i) => {
  if (result) {
    const { data: proxyData, error } = result;

    if (proxyData) {
      const { ip_address, isp, org, connection_type, asn, city, region, country, response_time } = proxyData;
      const newData = {
        key: i,
        option: option,
        ip_address,
        isp,
        org,
        connection_type,
        asn,
        address: `${city ? city : ''} ${region ? region : ''} ${country ? country : ''}`,
        response_time: `${response_time} ms`
      };
      setData(prevState => [...prevState, newData]);
    } else if (error) {
      const newData = {
        key: i,
        option: option,
        ip_address: proxies[i],
        isp: 'N/A',
        org: 'N/A',
        connection_type: 'N/A',
        asn: 'N/A',
        address: 'N/A',
        response_time: 'N/A',
        error: error.message
      };
      setData(prevState => [...prevState, newData]);
    }
  }
});
    } catch (error) {
      message.error(`An error occurred: ${error.message}`);
    }
  };

  const columns = [
    {
      title: 'TYPE',
      dataIndex: 'option',
    },
    {
      title: 'PROXY',
      dataIndex: 'ip_address',
    },
    {
      title: 'ADDRESS',
      dataIndex: 'address',
    },
    {
      title: 'CONNECTION TYPE',
      dataIndex: 'connection_type',
    },
    {
      title: 'RESPONSE',
      dataIndex: 'response_time',
    },
    {
      title: 'ISP',
      dataIndex: 'isp',
    },
  ]

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
    }, 2000);
  };


  return (
    <div className='container mx-auto'>
      <h1 className='text-xl font-bold text-center'>Proxy checker</h1>
      <Form className='md:mx-80 mt-2' onFinish={handleSubmit} initialValues={{ Option: 'Http/s' }}>
        <Form.Item
          label="Option" name="Option"
        >
          <Radio.Group >
            <Radio.Button value="Http/s">Http/s</Radio.Button>
            <Radio.Button value="Socks5">Socks5</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Proxy"
          name="proxies"
          rules={[{ required: true, message: "Proxy is required" }]}
        >
          <Input.TextArea rows={7} placeholder='exam input : proxy:port:proxyName:proxyPassword' />
        </Form.Item>
        <div className='flex justify-center'>
          <Button className='bg-blue-600' size='large' type="primary" htmlType="submit" loading={loadings[0]} onClick={() => enterLoading(0)}>
            Submit
          </Button>
        </div>
      </Form>

      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default Proxy