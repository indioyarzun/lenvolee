
export async function getServerSideProps() {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }