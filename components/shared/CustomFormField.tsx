"use client"
import React from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Control, FieldValues, FieldPath, ControllerRenderProps } from 'react-hook-form'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from "libphonenumber-js/core";
import { Textarea } from '../ui/textarea'
import { Checkbox } from '../ui/checkbox'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';



export enum FormFieldType {
  INPUT = "input",
  FILE = "file",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

interface CustomProps<T extends FieldValues = FieldValues> {
    control: Control<T>
    fieldType: FormFieldType,
    name: FieldPath<T>,
    label?:string,
    placeholder?:string,
    iconSrc?:string,
    iconAlt?:string,
    disabled?:boolean,
    dateFormat?:string,
    showTimeSelect?:boolean,
    children?:React.ReactNode,
    renderSkeleton?: (field: ControllerRenderProps<T>) => React.ReactNode,
}


const RenderInput = <T extends FieldValues>({field, props}: {field: ControllerRenderProps<T>; props: CustomProps<T>}) => {

  switch (props.fieldType) {
    case FormFieldType.INPUT:
        return (
            <div className="flex rounded-md border dark:border-dark-500 bg-white dark:bg-dark-400">
            {props.iconSrc && (
              <Image
                src={props.iconSrc}
                height={24}
                width={24}
                alt={props.iconAlt || "icon"}
                className="ml-2"
              />
            )}
            <FormControl>
            <Input
               placeholder={props.placeholder}
               {...field}
               className="shad-input border-0"
             />
          </FormControl>
            </div>
        )
        case FormFieldType.TEXTAREA:
          return (
            <FormControl>
              <Textarea
                placeholder={props.placeholder}
                {...field}
                className="shad-textArea"
                disabled={props.disabled}
              />
            </FormControl>
          );
        case FormFieldType.PHONE_INPUT:
            return(
                <FormControl>
                <PhoneInput
                defaultCountry="IN"
                placeholder={props.placeholder}
                international
                withCountryCallingCode
                value={field.value as E164Number | undefined}
                onChange={field.onChange}
                className="input-phone"
                />
                </FormControl>
            )
            case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
      case FormFieldType.DATE_PICKER:
        return (
          <div className="flex rounded-md border dark:border-dark-500 bg-white dark:bg-dark-400">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="user"
              className="ml-2"
            />
            <FormControl>
            <ReactDatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value}
              onChange={(date: Date | null) => {
                field.onChange(date);
              }}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? "dd/MM/yyyy"}
              wrapperClassName="date-picker"
            />
            </FormControl>
          </div>
        );
      case FormFieldType.SELECT:
        return (
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="shad-select-trigger">
                  <SelectValue placeholder={props.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="shad-select-content">
                {props.children}
              </SelectContent>
            </Select>
          </FormControl>
        );
      case FormFieldType.SKELETON:
        return props.renderSkeleton ? props.renderSkeleton(field) : null;
      default:
        return null;
  }
}



const CustomFormField = <T extends FieldValues>(props: CustomProps<T>) => {
   const {control, name, label } = props;
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className='flex-1 text-gray-800 dark:text-white'>
         {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
         )}

         <RenderInput
         field={field}
         props={props}
         />

         <FormMessage className='shad-error' />
      </FormItem>
    )}
  />
  )
}

export default CustomFormField