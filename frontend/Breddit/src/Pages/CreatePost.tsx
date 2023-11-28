import { Input } from 'antd';
import { Select } from 'antd';
const { TextArea } = Input;
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography } from 'antd';
import {useState, useEffect} from 'react';
import axios from 'axios';



const onChange = (value: string) => {
    console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
    console.log('search:', value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


const items: MenuProps['items'] = [
    {
        key: 'funny',
        label: 'Funny',
    },
    {
        key: 'Serious',
        label: 'Serious',
    },
    {
        key: 'Wholesome',
        label: 'Wholesome',
    },
];



const CreatePost = () => {
    interface communitySelection {value: string, label: string}
    const [communities,getCommunities] = useState<communitySelection[]>([]);

    useEffect( () => {
        axios.get("http://localhost:3000/allCommunities").then(function (response) {
            if (response.data){
                const allCommunitiesJson = response.data
                const formPrep : communitySelection[] = [];
                for (let community in allCommunitiesJson){
                    formPrep.push({value: allCommunitiesJson[community].name,
                                   label: allCommunitiesJson[community].name})
                }
                getCommunities(formPrep)
            }
        })
        .catch(function (error) {
            alert(error);
        });
      },[]);

    return (
        <div className='bg-slate-500 h-screen flex align-middle justify-center'>
            <div className='w-1/3 m-auto bg-slate-300 p-10 rounded'>
                <div className='border-solid border-b-2 border-slate-400 w-full text-xl'>Create a Post</div>
                <Select
                    className='mt-3 w-1/2'
                    showSearch
                    placeholder="Select a Community"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={communities}
                />
                <form action="" method="get" className="login-form flex flex-col">
                    <div className="login-form">
                        <Input placeholder='Title' type="text" className="w-full my-2">
                        </Input>
                    </div>
                    <div className="login-form">
                        <TextArea rows={7} placeholder='Text(optional)' />
                    </div>

                    <Dropdown className='rounded-full border-solid border-2 border-slate-400 w-fit mt-3 px-5 py-1'
                        menu={{
                            items,
                            selectable: true,
                            defaultSelectedKeys: ['3'],
                        }}
                    >
                        <Typography.Link>
                            <Space className='text-black'>
                                Flair
                                <DownOutlined />
                            </Space>
                        </Typography.Link>
                    </Dropdown>


                    <div className="login-form w-full">
                        <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded w-full mt-4">Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost;