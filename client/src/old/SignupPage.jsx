import React, { useState } from 'react';
import { FormTemplate } from './Form';
import ValidForm from './ValidForm';
import { signup as validation } from '../utils/validationService';
import authService from '../utils/authService';

function SignupPage () {
  const [user, setUser] = useState(authService.getLocalUser() || undefined);

  const signup = authService.getSignup(setUser);

  return (
    <FormTemplate linkTo={'/login'} linkText="Already have a booker account?">
      <ValidForm
        title="Join Booker"
        actionText="get started"
        action={signup}
        fields={{
          username: {
            label: "Username",
            type: "text",
            autoComplete: "username",
            validation: validation.validateUsername
          },
          email: {
            label: "Email",
            type: "email",
            autoComplete: "email",
            validation: validation.validateEmail
          },
          password: {
            label: "Password",
            type: "password",
            autoComplete: "current-password",
            validation: validation.validatePassword
          },
          confirmation: {
            label: "Confirm Password",
            type: "password",
            autoComplete: "current-password",
            validation: validation.validateConfirmation
          }
        }}
      />
    </FormTemplate>
  )
};

export default SignupPage;



///////


// function SignupPage () {
//   const [user, setUser] = useState(authService.getLocalUser() || undefined);

//   const signup = authService.getSignup(setUser);

//   return (
//     <div className='container'>
//       <div className='row'>
//         <Form className='col-10 col-md-8 mx-auto m-4 border'>
//           <h4 className='pb-2 text-center'>Join Booker</h4>
//           <div className='row my-2'>
//             <h6 className='d-inline'>Username</h6>
//             <Feedback for='username' />
//             <Input
//               name='username'
//               type='text'
//               validation={validation.validateUsername}
//             />
//           </div>
//           <div className='row my-2'>
//             <h6 className='d-inline'>Email</h6>
//             <Feedback for='email' />
//             <Input
//               name='email'
//               type='email'
//               validation={validation.validateEmail}
//             />
//           </div>
          
//           {/* <Input
//             name="email"
//             label="Email"
//             type="email"
//             autoComplete="email"
//             validation={validation.validateEmail}
//           />
//           <Input
//             name="username"
//             label="Username"
//             type="text"
//             autoComplete="username"
//             validation={validation.validateUsername}
//           />
//           <Input
//             name="password"
//             label="Password"
//             type="password"
//             autoComplete="current-password"
//             validation={validation.validatePassword}
//           />
//           <Input
//             name="confirmation"
//             label="Confirm Password"
//             type="password"
//             autoComplete="current-password"
//             validation={validation.validateConfirmation}
//           /> */}
//           <Action action={signup}>get started</Action>
//         </Form>
//         <Link className="col-12 text-center" to={linkTo}>{linkText}</Link>
//       </div>
//     </div>
//   )
// };