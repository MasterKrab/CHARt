import Cards from './_components/Project/Cards'
import getProjectsForView from '@/server/getProjectsForView'

export const revalidate = 0

const Home = async () => {
	const projects = await getProjectsForView()

	return <Cards projects={projects} />
}

export default Home
