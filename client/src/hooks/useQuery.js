import { useLocation } from 'react-router-dom';

/** Usage
 *
 * const query = useQuery();
 * query.get('name');
 */

const useQuery = () => new URLSearchParams(useLocation().search);

export default useQuery;
