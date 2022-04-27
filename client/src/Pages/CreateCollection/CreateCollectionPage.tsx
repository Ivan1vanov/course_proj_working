import React, { useState } from 'react'
import {Button, Container} from 'react-bootstrap'
import styles from './create.module.scss'
import axios from 'axios'

const CreateCollectionPage = () => {

    const [extraFieldName, setExtraFieldName] = useState({
        fieldName: ''
    })

    const [collectionData, setCollectionData]: any = useState({
    name: "",
    description: "", 
    format: "",
    creator: "6265621d35da00c479571d7d",
    image: "",
    extraFileds: []
    })

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCollectionData({
            ...collectionData,
            [e.target.name]: e.target.value
        })
    }


    const createCollectionHandler = (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault()
            console.log(collectionData)
            const createCollection = async () => {
                const {data} = await axios.post('http://localhost:5000/api/collection', collectionData)
                console.log(data)
            }
           createCollection()
    }

    const addAditionalField = (e: React.MouseEvent<HTMLElement>) => {
        setCollectionData({
            ...collectionData,
            extraFileds: [
                ...collectionData.extraFileds,
                extraFieldName
            ]
        })
     
    }
  return (
    <Container>
        <form>
        <div className="form-group">
            <label htmlFor="formGroupExampleInput">Name</label>
            <input type="text" onChange={onChangeHandler} className="form-control" id="formGroupExampleInput" name='name' placeholder="Name"/>
        </div>

        <div className="form-group">
            <label htmlFor="formGroupExampleInput">Description</label>
            <input type="text" onChange={onChangeHandler} className="form-control" id="formGroupExampleInput" name='description' placeholder="Description"/>
        </div>

        <div className="form-group">
            <label htmlFor="formGroupExampleInput">Format</label>
            <input type="text" onChange={onChangeHandler} className="form-control" id="formGroupExampleInput" name='format' placeholder="Format"/>
        </div>


        <div className={styles.extraField}>
        <label htmlFor="formGroupExampleInput">Add field</label>
        <div className="d-flex align-items-center justify-content-between">
            <div style={{width: '95%'}}>
            <input type="text" onChange={(e) => setExtraFieldName({
                fieldName: e.target.value
            })} className="form-control" id="formGroupExampleInput" name='fieldName' placeholder="Field name"/>
            </div>
            <div className='p-1'>
            <Button variant='success' onClick={addAditionalField} >Add</Button>
           
            </div>
        </div>
        <strong>Extra fields: </strong>
        <div>
            {
                collectionData.extraFileds?.map((field: {fieldName: string}, index: number) => (
                    <div key={index}>
                        {field.fieldName}
                    </div>
                ))
            }
        </div>
        </div>

        <Button onClick={createCollectionHandler}>Create</Button>
        </form>

        
    </Container>
  )
}

export default CreateCollectionPage