import { useState } from 'react'
import { IoAddCircle } from 'react-icons/io5';
import { BsToggle2Off, BsToggle2On } from 'react-icons/bs';

import { PortfolioManager } from './PortfolioManager';

export const PortfolioMgmt = ({projects}) => {
    const [allPortfolios, setAllPortfolios] = useState(projects) 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null)

    function getEditData(el){
      setEditData(el);
      setIsModalOpen(true);
    }


    return (
    <>
      <p className="text-xs text-secondary capitalize text-center font-semibold">
        admin
      </p>
      <h1 className="font-special capitalize text-center text-5xl font-black mb-10">
        portfolio management
      </h1>
      
      <div className="fixed h-screen top-0 right-0 p-6 flex flex-col justify-end">
          <IoAddCircle onClick={() => setIsModalOpen(true)} className='text-5xl z-20 cursor-pointer hover:rotate-90 transition-all hover:scale-110 origin-center'/>
      </div>

    {allPortfolios.length === 0 &&
      <section className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center h-[50vh] select-none">
        <span className='text-xs opacity-75'>
            No portfolio projects showcased!
        </span>
      </section>}

    {allPortfolios.length !== 0 &&
      <section className="w-full max-w-2xl relative z-10 mx-auto flex flex-col items-center justify-center h-auto select-none">
        <p className="flex flex-col items-start">
          <span className='text-xs'>
              Total portfolio projects : {allPortfolios.length}
          </span>
          <span className='text-xs'>
              Showcased projects : {(allPortfolios.filter(el => el.isShowcased)).length}
          </span>
        </p>
        <table className='mt-10 w-full max-w-2xl mx-auto table-auto border-collapse border border-dark'>
          <thead className='bg-dark text-light'>
              <tr className='capitalize'>
                  <th className='border border-light p-2 text-xs font-semibold text-left'>
                      #ID
                  </th>
                  <th className='border border-light p-2 text-xs font-semibold text-left'>
                      project
                  </th>
                  <th className='border border-light p-2 text-xs font-semibold text-left'>
                      design
                  </th>
                  <th className='border border-light p-2 text-xs font-semibold text-left'>
                      showcased
                  </th>
                  <th className='border border-light p-2 text-xs font-semibold text-left'>
                      actions
                  </th>
              </tr>
          </thead>
          <tbody>
          {allPortfolios.map((portfolio, i) => (
            <tr key={portfolio._id}>
              <td className='border p-2 text-xs border-dark text-left'>
                {i + 1}  
              </td>  
              <td className='border p-2 text-xs border-dark text-left'>
                {portfolio.project.title}  
              </td>  
              <td className='border p-2 text-xs border-dark text-left'>
                {portfolio.design.title}  
              </td>  
              <td className='border p-2 border-dark text-left'>
                <div className='w-full grid place-content-center'>
                  {portfolio.isShowcased ? <BsToggle2On className='text-lg text-secondary' /> : <BsToggle2Off className='text-lg text-primary' />}
                </div>
              </td>  
              <td className='border p-2 text-xs border-dark text-left'>
                <button onClick={() => getEditData(portfolio)} className='w-full text-center uppercase hover:underline hover:text-primary'>
                  <small>
                    edit
                  </small>
                </button>
              </td>  
            </tr>
          ))}
          </tbody>
        </table>
      </section>}

      {isModalOpen && 
        <PortfolioManager 
          add={el => {
            setAllPortfolios(prev => [...prev, el])
            setEditData(null)
          }}
          del={el => {
            setAllPortfolios(prev => prev.filter(item => item._id !== el._id))
            setEditData(null)
          }}
          edit={el => {
            setAllPortfolios(prev => prev.map(item => item._id === el._id ? el : item))
            setEditData(null)
          }}
          existing={allPortfolios}
          editMode={editData}
          handleClose={() => setIsModalOpen(false)}/>
        }
    </>
  )
}
