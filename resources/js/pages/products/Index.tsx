import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Megaphone } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

interface PageProps {
    flash: {
        message?: string;
    },
    products: Product[];
}

export default function Index() {

    const { products, flash } = usePage().props as PageProps;

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if(confirm(`Do you want to delete a product ${id} - ${name}?`)) {
            destroy(route('products.destroy', id));
        }
    }

    const handleEdit = (id: number) => {}

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div>
                <Link href={route('products.create')} className="mb-4 inline-block">
                    <Button>
                        Create a Product
                    </Button>
                </Link>
            </div>

            <div className='m-4'>
                {flash.message && (
                    <Alert>
                        <Megaphone className='h-4 w-4' />
                        <AlertTitle>Notification</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}
            </div>

            {products.length > 0 && (
                <Table>
                    <TableCaption>A list of your products.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>Rs.{product.price.toFixed(2)}</TableCell>
                                <TableCell className='space-x-4'>
                                    <Button disabled={processing} onClick={() => handleDelete(product.id, product.name)} className='bg-red-500 hover:bg-red-700 text-white'>Delete</Button>
                                    <Link href={route('products.edit', product.id)}>
                                        <Button className='bg-blue-500 hover:bg-blue-700 text-white'>Edit</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

        </AppLayout>
    );
}
