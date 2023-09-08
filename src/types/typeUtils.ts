// https://timmousk.com/blog/typescript-partial/

export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>
}
/*
interface IPerson {
    firstName: string;
    lastName: string;
    address: {
       city: string;
       country: string;
    }
}

const updatePerson: RecursivePartial<IPerson> = {
    address: {
        city: 'Montreal'
    },
    firstName: 'Tim',
}
*/

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>

/*
interface IPerson {
    firstName: string;
    lastName: string;
    password: string
    age: number;
}

type UpdatedPerson = AtLeast<IPerson, 'firstName'>;

const updatedPerson: UpdatedPerson = {
    firstName: 'Tim'
}
*/