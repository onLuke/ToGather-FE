import { RefObject, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { pageNumber } from '../contexts/chachingOptionAtom';

const useInfinityScroll = ({ target }: { target: RefObject<HTMLElement> }) => {
  const [page, setPage] = useRecoilState(pageNumber);
  useEffect(() => {
    const targetElement = target.current;
    console.log(page);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setPage(page + 1);
        }
      });
    });

    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, [target.current]);
};

export default useInfinityScroll;
