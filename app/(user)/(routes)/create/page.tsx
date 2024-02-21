"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';
import axios from "axios"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation" 

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CategoriesBox, ConditionsBox } from "./components/combobox-values"
import { ImageUpload } from "@/components/image-upload" 
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const FormSchema = z.object({
    title: z.string().min(5).max(30),
    price: z.number(),
    description: z.string().min(20).max(550),
    images: z.object({ url: z.string() }).array().refine(data => data.length > 0, {
        message: "Image is required"
    }),
    category: z.string().refine(data => data !== "", {
        message: "Select category"
    }),
    condition: z.string().refine(data => data !== "", {
        message: "Select condition"
    }),
})

const defaultValues = {
    title: '',
    category: '',
    condition: '',
    description: '',
    images: [],
}

type ProductFormSchema = z.infer<typeof FormSchema>

export default function CreateProduct() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<ProductFormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues
    })


    const onSubmit = async (values: ProductFormSchema) => {
        try {
            setLoading(true)
            await axios.post('/api/products', values)
            router.refresh()
            toast.success('Product created')
            location.reload()
        } catch (error: any) {  
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form { ...form }>
            <form 
                className="max-w-[700px] flex flex-col justify-center items-center space-y-4 pt-3 pb-14 px-3 lg:px-0 mx-auto"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="w-full text-start">
                    <h1 className="text-lg font-black">Create your product</h1>
                    <p className="font-medium text-sm hidden sm:block">Turn your ideas into reality with our easy-to-use product creation platform,<br/>offering seamless customization and integration.</p>
                </div>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="w-full pl-0">
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder="title..." 
                                    disabled={loading}
                                    { ...field } 
                                />
                            </FormControl>
                            <FormDescription>
                                Enhance your product's appeal by crafting a descriptive and compelling title that captures its essence and attracts your target audience
                            </FormDescription>
                            <FormMessage className="mt-0" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem className="w-full pl-0">
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input 
                                    type="number" 
                                    min={0}
                                    placeholder="euro" 
                                    disabled={loading}
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(parseFloat(e.target.value));
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                Set an attractive price that reflects the value of your product and appeals to your target audience
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea 
                                    className="h-[300px]"
                                    placeholder="description..." 
                                    disabled={loading}
                                    { ...field } 
                                />
                            </FormControl>
                            <FormDescription>
                                Craft a captivating description for your product, highlighting its unique features and benefits to engage your audience effectively
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-wrap justify-center items-center">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <CategoriesBox 
                                        value={field.value}
                                        disabled={loading}
                                        onChange={(value) => field.onChange(value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="condition"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <ConditionsBox 
                                        value={field.value}
                                        disabled={loading}
                                        onChange={(value) => field.onChange(value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <ImageUpload 
                                    value={field.value.map((image) => image.url)}
                                    disabled={loading}
                                    onChange={(url) => field.onChange([...field.value, { url }])}
                                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button 
                    className="self-center lg:mb-0 mt-5" 
                    type="submit"
                    disabled={loading}
                >
                    Add Product
                </Button>
            </form>
        </Form>
    )
}