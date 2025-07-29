import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Product',
        href: '/create',
    },
];

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: 0,
        description: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a Product" />
            <div className='w-8/12 p-4'>
                <form className="space-y-4" onSubmit={handleSubmit}>
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

                    <Button type="submit">Create Product</Button>
                </form>
            </div>
        </AppLayout>
    );
}
