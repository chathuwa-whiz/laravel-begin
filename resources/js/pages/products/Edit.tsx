import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

interface Props {
    product: Product;
}

export default function Edit({product} : Props) {

    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        description: product.description
    })

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
    }

    return (
        <AppLayout breadcrumbs={[{title: 'Edit a Product', href: `/products/${product.id}/edit`}]}>
            <Head title="Edit a Product" />
            <div className='w-8/12 p-4'>
                <form className="space-y-4" onSubmit={handleUpdate}>
                    {/* display error */}
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <AlertCircle className='h-4 w-4' />
                            <AlertTitle>Errors</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, value]) => (
                                        <li key={key}>{value as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className='gap-1.5'>
                        <Label htmlFor='product name'>Name</Label>
                        <Input placeholder='Product Name' value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor='product price'>Price</Label>
                        <Input placeholder='Product Price' type='number' value={data.price} onChange={(e) => setData('price', Number(e.target.value))} />
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor='product description'>Description</Label>
                        <Textarea placeholder='Description' value={data.description} onChange={(e) => setData('description', e.target.value)}    />
                    </div>

                    <Button type="submit">Edit Product</Button>
                </form>
            </div>
        </AppLayout>
    );
}
