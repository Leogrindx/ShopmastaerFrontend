export interface Iverification{
    status: boolean,
    messages: Averification[]
}

export interface Averification{
    input: string, message: string
}

export const verification = (first_name: string, last_name: string, email: string, password: string, confirm: string) => {
    const errors = {status: true, messages: [] as Averification[]}
    const prop = [{input: 'first_name', value: first_name},
                  {input: 'last_name', value: last_name},
                  {input: 'email', value: email},
                  {input: 'password', value: password},
                  {input: 'confirm', value: confirm},
                ]
    prop.forEach(e => {
        if(e.value.length === 0){
            errors.status = false; errors.messages.push({input: e.input, message: 'this field must not be empty'})
        }
    })
    if(email.indexOf('@') < 0){
        errors.status = false; errors.messages.push({input: 'email', message: 'email wrong, please check him'})
    } 
    if(!/[A-Z]/.test(password)){
        errors.status = false; errors.messages.push({input: 'password', message: 'password must have at least one big letter'})
    } 
    if(!/[0-9]/.test(password)){
        errors.status = false; errors.messages.push({input: 'password', message: 'password must have at least one number'})
    }
    if(password.length <= 7){
        errors.status = false; errors.messages.push({input: 'password', message: 'password must have length at least 8 symbols'})
    }
    if(password !== confirm){
        errors.status = false; errors.messages.push({input: 'password', message: 'password does not match. Please try again'})
        errors.messages.push({input: 'confirm', message: 'password does not match. Please try again'})
    }
    return errors
}