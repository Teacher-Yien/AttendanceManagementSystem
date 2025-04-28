import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'ផ្តាំងព័ត៏មាន',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="ផ្តាំងព័ត៏មាន" />
            <div className='flex gap-2 p-5 flex-column'>
                <div className="box p-4 rounded bg-red-300 basis-[250px]">
                    <center>
                        <span className=' text-3xl'>ចំនួនថ្នាក</span>
                        <p>10</p>
                    </center>
                </div>
                <div className="box p-4 rounded bg-red-300 basis-[250px]">
                    <center>
                        <span className=' text-3xl'>សិស្សគួររំលឹក</span>
                        <p>10</p>
                    </center>
                </div>
                <div className="box p-4 rounded bg-red-300 basis-[250px]">
                    <center>
                        <span className=' text-3xl'>សិស្សគួររំលឹក</span>
                        <p>10</p>
                    </center>
                </div>
            </div>
        </AppLayout>
    );
}
