import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useUsersActions } from "../hooks/useUsersActions";
import { useEffect, useState } from "react";
import { useFormContext } from "../context/formContext";
import { UserWithId } from "../store/users/slice";

type Props ={
    userToEdit?: UserWithId | null
};

export function CreateNewUser({userToEdit}: Props) {
    const {addUser, updateUser} = useUsersActions()
    const [result, setResult] = useState<'ok' | 'ko' |null>(null)
    const {setFormState} = useFormContext()

    const [formData, setFormData] = useState({
        id: userToEdit?.id ?? "",
        name: userToEdit?.name ?? "",
        email: userToEdit?.email ?? "",
        github: userToEdit?.github ?? "",
    });

    useEffect(() => {
        if (userToEdit) {
          setFormData({
            id: userToEdit.id,
            name: userToEdit.name,
            email: userToEdit.email,
            github: userToEdit.github,
          });
        }
      }, [userToEdit]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
      };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form) 

        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const github = formData.get("github") as string

        //checks if the field are empty
        if (!name || !email || !github) {
            return setResult('ko')
        }
        
        if(userToEdit){
            // Call the updateUser function with the form data
            updateUser({id: userToEdit.id!, name, email, github})
        }
        else {
            // Call the addUser function with the form data
            addUser({name, email, github})
        }

        setResult('ok')
        setFormData({ id: "", name: "", email: "", github: "" });
        // Reset the form after submission
        form.reset()
        setTimeout(function() {setResult(null)},2000)
    }

    return (
        <Card className="mt-6 w-full max-w-4xl" >
        <Title>Crear/Actualizar nuevo usuario</Title>

        <form className="" onSubmit={handleSubmit}>
            <TextInput
                autoFocus
                name="name"
                className="mt-6"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
            />
            <TextInput
                name="email"
                className="mt-6"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <TextInput
                name="github"
                className="mt-6"
                placeholder="Github"
                value={formData.github}
                onChange={handleChange}
            />
            <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Button 
                        className="bg-green-600 text-white hover:bg-green-700"
                        type="submit"
                        style={{marginTop:'16px'}}
                        >   
                        {userToEdit ? "Actualizar" : "Guardar"}
                    </Button>
                    <span style={{marginLeft:'20px'}}>
                        {result === null && <Badge color="gray" >Esperando...</Badge>}
                        {result === 'ok' && <Badge className='bg-emerald-100 text-emerald-800 ring-emerald-600/10 dark:bg-emerald-500/20 dark:text-emerald-500 dark:ring-emerald-400/20' >Aceptado</Badge>}
                        {result === 'ko' && <Badge className="'bg-orange-100 text-orange-800 ring-orange-600/10 dark:bg-orange-500/20 dark:text-orange-500 dark:ring-orange-400/20',
                        'inline-flex items-center rounded-tremor-small px-2 py-0.5 text-tremor-label font-medium ring-1 ring-inset'" >Error, llene todos los espacios</Badge>} 
                    </span>
                </div>
                <Button 
                    className="bg-red-500 text-white hover:bg-red-600"
                    type="button"
                    style={{marginTop:'16px', alignItems:'right'}}
                    onClick={() => setFormState(false)}
                    >   
                    Cerrar
                </Button>
            </div>
        </form>
        </Card>
    );
}