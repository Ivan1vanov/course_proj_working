import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';

const CreateItem = () => {

    const collectionExample = {
        _id: "6267d8460d92a9fe54b141e8",
        name: "My Books",
        description: "Some my intresting books",
        format: "Books",
        creator: "6265621d35da00c479571d7d",
        image: "some/image",
        specifiedFields: [
                {
                    fieldName: "Author",
                    _id: "6267d8460d92a9fe54b141ea"
                },
                {
                    fieldName: "Deployed",
                    _id: "6267d8460d92a9fe54b141eb"
                },
                {
                    fieldName: "Rating",
                    _id: "6267d8460d92a9fe54b141ec"
                }
            ],
            createdAt: "2022-04-26T11:32:22.076Z",
            updatedAt: "2022-04-26T11:32:22.126Z",
    }

    const [extraItemFields, setExtraItemFields]: any = useState([])
    const [itemData, setItemData]: any = useState({
        name: '',
        tags: '',
        collectionId: '6267d8460d92a9fe54b141e8',
        extraItemFields: []
    })

    const onChangeStaticDataItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemData({
            ...itemData,
            [e.target.name]: e.target.value
        })
    }

    // useEffect(() => {
    //     collectionExample.specifiedFields.map((field, index) => {
    //         setExtraItemFields([...extraItemFields, {
    //             extraItemName: field.fieldName,
    //             extraItemData: ""
    //         }])
    //     })
    
    // }, [])

    const onChangeHandler = (value: string, name: string) => {
    setExtraItemFields({
            ...extraItemFields,
            [name]: value
    })
    setItemData({
        ...itemData,
        extraItemFields: extraItemFields
    })
    }
 
    const createItemHanler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()

        const createCollection = async () => {
            const {data} = await axios.post('http://localhost:5000/api/item', itemData)
            console.log(data)
        }
       createCollection()

    }


  return (
    <div>
         <form>
        <div className="form-group">
            <label htmlFor="formGroupExampleInput">Name</label>
            <input onChange={onChangeStaticDataItem} type="text" className="form-control" id="formGroupExampleInput" name='name' placeholder="Name"/>
        </div>
        <div className="form-group">
            <label htmlFor="formGroupExampleInput">Tags</label>
            <input onChange={onChangeStaticDataItem} type="text" className="form-control" id="formGroupExampleInput" name='tags' placeholder="Format"/>
        </div>
        -----------------------------------------------------------------
        {collectionExample.specifiedFields.map((field, index) => (
            <div key={index}>
                <label htmlFor="formGroupExampleInput">{field.fieldName}</label>
                <input onChange={(e) => onChangeHandler(e.target.value, e.target.name)} type="text" className="form-control" name={field.fieldName} placeholder="Name"/>
            </div>
        ))}
        <Button onClick={createItemHanler}>show</Button>
        </form>
    </div>
  )
}

export default CreateItem