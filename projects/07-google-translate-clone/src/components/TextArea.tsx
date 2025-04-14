/* eslint-disable react/react-in-jsx-scope */
import { Form } from "react-bootstrap";
import { SectionType } from "../types.d";
import React from "react";

interface Props {
    type: SectionType
    value: string
    loading?: boolean
    onChange: (value: string) => void
}


const getPlaceholder = ({type, loading}: {type: SectionType, loading?: boolean})=>{
    console.log({loading})
    
    if (type == SectionType.From) {
        console.log ({type})
        return 'Introducir texto'}

    if (loading==true) return '...Traduciendo'

    return 'Traduccion'
}


const commonStyles = {border:0, height: '200px', resize: 'none'}

export const TextArea = ({type, loading, value, onChange} :Props) =>{
    const styles = type == SectionType.From
    ? commonStyles
    : {...commonStyles, backgroundColor:'#f5f5f5'}

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
      }

    return(
        <Form.Control
        autoFocus = {type == SectionType.From ? true : false}
        as = 'textarea'
        disabled = {type == SectionType.To}
        placeholder = {getPlaceholder({type, loading})}
        style = {styles}
        value={value}
        onChange={handleChange}
        />
    )
}