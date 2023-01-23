import React, { useState } from "react"
import usePagination from "./utils/usePagination"
import Item from "../Item"
import { Divider, Grid, List, ListItem, Pagination } from "@mui/material"

const PaginationItems = ({datas, children}) => {
    const [page, setPage] = useState(1)
    const PER_PAGE = 5;
    const count = Math.ceil(datas.length / PER_PAGE)
    const _DATA = usePagination(datas, PER_PAGE)

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);  
    };

    console.log(_DATA.maxPage)

    return <React.Fragment>
      

        <Grid container spacing={2} sx={{
                marginTop: '4rem'
            }}>
                {datas.length > 0
                    ? (_DATA.currentData().map((item, key, currentValue) => {
                        return (key <= 1)
                            ? <Grid key={key} item md={6} sx={{position: 'relative'}}>
                                <Item 
                                    key={key}
                                    item={currentValue}
                                    index={key}
                                />
                        </Grid>
                        : <Grid item md={4} sx={{position: 'relative'}}>
                                <Item 
                                    key={key}
                                    item={currentValue}
                                    index={key}
                                />
                        </Grid>
                    }
                        
                    ))
                    : <React.Fragment></React.Fragment>
                }
            </Grid>

        <Pagination
            count={count}
            size="large"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
            sx={{margin: '1.5rem 0 0 0'}}
        />
    </React.Fragment>
}

export default PaginationItems