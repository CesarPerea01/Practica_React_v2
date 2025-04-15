import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useUsersActions } from "../hooks/useUsersActions";
import { useState } from "react";

export function CreateNewUser() {
    const {addUser, formState, handleFormState} = useUsersActions()
    const [result, setResult] = useState<'ok' | 'ko' |null>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form) 

        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const github = formData.get("github") as string
        
        if (!name || !email || !github) {
            return setResult('ko')
        }

        addUser({name, email, github})
        setResult('ok')
        // Reset the form after submission
        form.reset()
    }

    return (
        <Card className="mt-6 w-full max-w-4xl" style ={{display: formState ? 'flex' : 'block'}}>
        <Title>Crear/Actualizar nuevo usuario</Title>

        <form className="" onSubmit={handleSubmit}>
            <TextInput
                name="name"
                className="mt-6"
                placeholder="Nombre"
            />
            <TextInput
                name="email"
                className="mt-6"
                placeholder="Email"
            />
            <TextInput
                name="github"
                className="mt-6"
                placeholder="Github"
            />
            <div>
                <Button 
                    className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
                    type="submit"
                    style={{marginTop:'16px'}}
                    >   
                    Guardar
                </Button>
                <span style={{marginLeft:'20px'}}>
                    {result === null && <Badge color="gray" >Esperando...</Badge>}
                    {result === 'ok' && <Badge className='bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-500/20 dark:text-emerald-500 dark:ring-emerald-400/20' >Usuario creado correctamente</Badge>}
                    {result === 'ko' && <Badge className="'bg-orange-100 text-orange-800 ring-orange-600/10 dark:bg-orange-500/20 dark:text-orange-500 dark:ring-orange-400/20',
                    'inline-flex items-center rounded-tremor-small px-2 py-0.5 text-tremor-label font-medium ring-1 ring-inset'" >Error al crear el usuario</Badge>} 
                </span>
            </div>
        </form>
        </Card>
    );
}