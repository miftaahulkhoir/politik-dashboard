export default function Index({ pageProps }) {
  return (
    <>
      <div className='col-12 pb-5 mb-5'>
        <h1>Dashboard</h1>
      </div>
      <div className='col-12'>
        <div className='card'>
          <div className='card-body'></div>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <div className='card-body'></div>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <div className='card-body'></div>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <div className='card-body'></div>
        </div>
      </div>
      <div className='col-3'>
        <div className='card'>
          <div className='card-body'></div>
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <div className='card-body'></div>
        </div>
      </div>
      <div className='col-6'>
        <div className='card'>
          <div className='card-body'></div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return { props: {} };
}
