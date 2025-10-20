import { db } from '@/server/db'

import Cards from './_components/Project/Cards'

import getProjectsForView from '@/server/getProjectsForView'

const Home = async () => {
	const projects = await getProjectsForView()

	return <Cards projects={projects} />
}

export default Home
