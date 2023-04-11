import { IoIosFlag, IoMdLock, IoMdMail, IoMdPerson, IoMdPhonePortrait } from "react-icons/io";
import { FieldData } from "../types";
import { BsFillCameraFill, BsFillFileEarmarkPersonFill } from "react-icons/bs";

// array of data for the input fields we parse through in Signup and ProfileEdit pages
// file is tsx to allow import from react icons
export const fields: FieldData[][] = [
    [{ id: 'email',
     icon: <IoMdMail />,
     }],
     [{id: 'password',
      icon: <IoMdLock />,
      title: '8-20 characters, at least 1 of each: Capital, lowercase, digit'}],
     [{ id: 'name',
     icon: <IoMdPerson/>,
     }],
     [
         {
             id: 'dial',
             icon: <IoIosFlag />,
             list: 'country-codes',
             style: {
                flex: 1
             }
         },
         {
             id: 'phone',
             icon: <IoMdPhonePortrait />,
             title: '10 digits length, e.g. 0541234567',
             style: {
                flex: 2
             }
         }
     ],
    [ { id: 'bio',
     icon: <BsFillFileEarmarkPersonFill />,
     }],
 ]

//  export const photoData: FieldData = {
//     id: 'photo',
//     icon: <BsFillCameraFill />,
//     title: 'Your profile picture URL will be displayed here',
//     disabled: true,
//     style: {
//         flex: 1,
//         borderInlineEnd: 0,
//     }
//  }