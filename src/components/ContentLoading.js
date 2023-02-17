import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ContentLoading = () => {
  return (
    <>   
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <div className="container post-card d-flex flex-column justify-content-center mt-4">  
                    <div className="post-header d-flex align-items-center p-2 mt-2">
                        <div className="post-profile-pic-container">
                            <Skeleton width={42} height={42} circle inline />
                        </div>
                        <div className="mx-3 mt-3" style={{lineHeight: "1.1"}}>
                            <Skeleton width={200} height={10} />
                            <Skeleton width={200} height={10} />
                        </div>
                    </div>
                    
                    <div className='text-center'>
                     <Skeleton className='skeleton-img' height={200} />

                    </div>
                    
                    <div className="post-text mb-2 mx-2">
                        <Skeleton className='skeleton-text' height={10} count={3.5} />
                    </div>
                </div>  
        </SkeletonTheme>
    </>
  )
}

export default ContentLoading