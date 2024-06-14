import { VacancyDTO } from '@/app/store/slices/getVacancySlice.ts';
import Modal from '@/widgets/Modal/Modal.tsx';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  ScrollArea,
  ScrollBar,
} from '@/shared/ui';
import { sendReaction } from '@/widgets/FetchData/fetchVacancies.ts';

export function vacancyOffer(
  closeModal: () => void,
  selectedVacancy: VacancyDTO
) {
  return (
    <Modal onClose={closeModal}>
      <div className="p-4 ">
        <ScrollArea className="w-full hidden lg:block">
          <Card className="mx-auto max-h-max max-w-[500px] shadow-none border border-slate-950 rounded-[2px]">
            <CardHeader className="w-full flex flex-row justify-between gap-2">
              <div className="flex flex-col gap-1">
                <p className="text-slate-950 font-thin underline">
                  Vacancy Name
                </p>
                <h2 className="text-slate-950 text-3xl font-light">
                  {selectedVacancy.position || 'Here will be your vacancy name'}
                </h2>
              </div>
              <div className="h-full flex items-start">
                <img
                  src="https://www.reksoft.ru/wp-content/uploads/2019/05/logo.png"
                  className="w-[125px] object-contain"
                ></img>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div>
                <h3>Address</h3>
                <CardDescription>
                  {selectedVacancy.address ? (
                    <p className="text-slate-950 text-sm font-semibold">
                      {selectedVacancy.address}
                    </p>
                  ) : (
                    'here will be address for the position'
                  )}
                </CardDescription>
              </div>
              <div>
                <h3>Experience</h3>
                <CardDescription>
                  {selectedVacancy.experience ? (
                    <p className="text-slate-950 text-sm font-semibold">
                      from {selectedVacancy.experience} years of experience
                    </p>
                  ) : (
                    'here will be min and max salary for the position'
                  )}
                </CardDescription>
              </div>
              <div>
                <h3>Salary</h3>
                <CardDescription>
                  {selectedVacancy.salaryMin && selectedVacancy.salaryMax ? (
                    <p className="text-slate-950 text-sm font-semibold">
                      {selectedVacancy.salaryMin}$ - {selectedVacancy.salaryMax}
                      $
                    </p>
                  ) : (
                    'here will be min and max salary for the position'
                  )}
                </CardDescription>
              </div>
              <div>
                <h3>Job Description</h3>
                <CardDescription className="text-slate-950 text-sm font-thin break-words">
                  {selectedVacancy.description ||
                    'here will be vacancy description'}
                </CardDescription>
              </div>
              <div>
                <h3>Job Requirements</h3>
                <CardDescription className="text-slate-950 text-sm font-thin break-words">
                  {selectedVacancy.requirements ||
                    'here will be vacancy requirements'}
                </CardDescription>
              </div>
              <div>
                <h3>Job Ideal Candidate</h3>
                <CardDescription className="text-slate-950 text-sm font-thin break-words">
                  {selectedVacancy.idealCandidate ||
                    'here will be vacancy ideal candidate'}
                </CardDescription>
              </div>
              <div className="flex flex-col gap-1">
                <h3>Work Format</h3>
                <CardDescription className="flex flex-wrap gap-1">
                  {selectedVacancy.workFormat &&
                  selectedVacancy.workFormat.length
                    ? selectedVacancy.workFormat.map((item, index) => {
                        return (
                          <Badge
                            key={`${item}-${index}`}
                            className="flex items-center gap-1 w-fit"
                          >
                            {item}
                          </Badge>
                        );
                      })
                    : 'here will be vacancy work format requirements'}
                </CardDescription>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex items-end flex-col gap-1 ">
                {selectedVacancy.businessId ? (
                  <div className="flex w-full justify-between items-center gap-1">
                    <Button onClick={() => sendReaction(selectedVacancy)}>
                      Откликнуться
                    </Button>
                    <div className="flex items-center gap-1">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthelondonmagazine.org%2Fwp-content%2Fuploads%2F2019%2F11%2FFeature-Image-The-Brothers-Karamazov-2.jpg&f=1&nofb=1&ipt=421e8a95bd1ea4544f62bf2cf2514552447009adb800cceed49b7166b19a01c3&ipo=images" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-slate-950 font-thin text-sm">
                          Responsible hr
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  'here will be hr responsible for the vacancy'
                )}
              </div>
            </CardFooter>
          </Card>
          <ScrollBar className="invisible" />
        </ScrollArea>
      </div>
    </Modal>
  );
}
