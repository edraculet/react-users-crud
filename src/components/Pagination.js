import React from "react";
import {
    EuiButton,
    EuiSpacer,
} from '@elastic/eui';

export default function Pagination(pagination) {

    const args = pagination.pagination;
    const loadNextPage = () => {
        args.setPageIndex(args.currentPage * args.itemsPerPage);
        args.setCurrentPage(args.currentPage + 1);
    };
    const loadPrevPage = () => {
        args.setCurrentPage(args.currentPage - 1);
        args.setPageIndex( args.pageIndex / args.itemsPerPage);
    };
    const hasNextPage = (args.pageInfo.hasNextPage || (args.currentPage === 1 && args.itemsLength > args.itemsPerPage) ) ? '' : "isDisabled";
    const hasPrevPage = (!args.pageInfo.hasPreviousPage || args.currentPage === 1) ? "isDisabled" : '';
    return (
        <div>
            <EuiSpacer size="m"/>
            <EuiButton isDisabled={hasPrevPage}
                       onClick={loadPrevPage}
                       iconType="arrowLeft">
                prev
            </EuiButton>&nbsp; &nbsp;
            <EuiButton
                isDisabled={hasNextPage}
                iconType="arrowRight"
                onClick={loadNextPage}>
                next
            </EuiButton>
        </div>
    );
}