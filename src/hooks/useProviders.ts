// Extracted from https://github.com/MasterKrab/tweeter/blob/main/hooks/useProviders.ts

import { getProviders } from 'next-auth/react'
import usePromise from '@/hooks/usePromise'

const useProviders = () => {
	const providers = usePromise(getProviders)

	return Object.values(providers.result || {}) as { id: string; name: string }[]
}

export default useProviders
