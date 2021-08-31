import React, {useEffect,useState} from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

import usersData from '../users/UsersData'
import { http } from 'src/helpers/http'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['id','kode_provinsi', 'kode_kabupaten', 'kabupaten', 'status_adm', 'nik', 'dati1', 'dati2', 'aksi']

const Dukcapil = () => {

    const [data, setData] = useState([]); //deklarasi variabel
    const [totalData, setTotalData] = useState(0);
    const [page, setPage] = useState(0);
    const [sizePerPage, setSizePerPage] = useState(100);

    useEffect(() => {
        const fetch = async () => {
            try{
                const params = {
                    page: page,
                    size: sizePerPage,
                    sort: 'id'
                };

                const {data} = await http.get('/dukcapil/page', params);
                setData(data);
            }catch(err){
                setData([]);
                return err;
            }
        }
        fetch();
    }, [page, sizePerPage] )

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              Dukcapil Data
              <DocsLink name="CModal"/>
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={data?.content ? data?.content : []}
              fields={fields}
              itemsPerPage={100}
              pagination
              scopedSlots = {{
                'aksi':
                  (item)=> {
                      console.log(item)
                      return (
                        <td>
                          <CBadge color="primary">
                            test
                          </CBadge>
                        </td>
                      )
                  }

              }}
            />
            </CCardBody>
          </CCard>
        </CCol>

      </CRow>
 </>
  )
}

export default Dukcapil
