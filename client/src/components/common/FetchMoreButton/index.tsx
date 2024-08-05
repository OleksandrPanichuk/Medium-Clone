
import { cn } from '@/lib';
import styles from './FetchMoreButton.module.scss'
import { ChevronDown, Loader2 } from 'lucide-react';

interface IFetchMoreButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    canFetchMore:boolean
    loading:boolean
}

export const FetchMoreButton = ({canFetchMore,loading, ...props}:IFetchMoreButtonProps) => {
  return <>
    {canFetchMore && (
    <button
    {...props}
        className={cn(styles.button, props.className)}
        aria-disabled={loading || props['aria-disabled']}
        disabled={loading || props.disabled}
    >
        {loading ? (
            <Loader2 className={styles.loader} />
        ) : (
            <span className={styles.more}>
                <ChevronDown />
                Show More
            </span>
        )}
    </button>
)}
  </>
};
