interface Props {
    params: Promise<{meetingId:string}>
}
const SingleMeetingPage = async({params}:Props) => {
    const { meetingId } = await params;
    console.log(meetingId);
  return <div>SingleMeetingPage</div>;
};
export default SingleMeetingPage;
