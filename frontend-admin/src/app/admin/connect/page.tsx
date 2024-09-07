'use client';
import tableDataDevelopment from 'variables/data-tables/tableDataDevelopment';
import tableDataCheck from 'variables/data-tables/tableDataCheck';
import CheckTable from 'components/admin/data-tables/CheckTable';
import tableDataColumns from 'variables/data-tables/tableDataColumns';
import tableDataComplex from 'variables/data-tables/tableDataComplex';
import DevelopmentTable from 'components/admin/data-tables/DevelopmentTable';
import ColumnsTable from 'components/admin/data-tables/ColumnsTable';
import ComplexTable from 'components/admin/data-tables/ComplexTable';
import { MdAdd, MdRefresh } from 'react-icons/md';
import { Button, ButtonGroup } from "@chakra-ui/react"
import Sources from 'components/admin/connect/Sources';

const Tables = () => {
    return (
        <div className='mt-5'>
            <div className="flex justify-end gap-4">
                <button className="flex items-center rounded-md border border-brand-500 text-black px-3 py-3 text-base font-medium  transition duration-200 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                    <MdRefresh className="mr-2" />
                    Refresh
                </button>
                <button className="flex items-center rounded-md bg-brand-500 px-3 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                    <MdAdd className="mr-2" />
                    Add sources
                </button>
            </div>
            <div className="mt-5 grid w-full grid-cols-1 gap-8">

                <Sources />
                {/* <ComplexTable tableData={tableDataComplex} /> */}
                {/* <CheckTable tableData={tableDataCheck} /> */}
            </div>
        </div>
    );
};

export default Tables;
