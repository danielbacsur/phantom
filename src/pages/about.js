import Wrapper from 'components/Wrapper'
import team from 'static/team'

const Post = () => {
    return (
        <Wrapper>
            <div className='px-8 py-16 sm:py-32 lg:px-0'>
                <div className="text-center pb-8">
                    <span className="text-6xl font-tostada">about us</span>
                    <p className="max-w-lg mt-8 mx-auto font-karla">Valam</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {team.map(member => (
                        <div className="text-center flex flex-col p-8">
                            <img
                                src={member.image}
                                class="mx-auto h-32 w-32 rounded-full object-cover shadow-xl"
                            />
                            <span class="mt-8 text-lg font-bold font-lora">{member.name}</span>
                            <p class="mt-2 text-xs font-medium text-gray-600">
                                {member.role}
                            </p>
                            <p class="mt-4 text-sm">
                                {member.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Wrapper>
    )
}

export default Post