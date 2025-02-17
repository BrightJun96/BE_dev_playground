// import { Test, TestingModule } from "@nestjs/testing";
// import { ConceptDomain } from "../../domain/concept.domain";
// import { GetConceptListRequestDto } from "../../dto/request/get-concept-list.request.dto";
// import { ManageConceptRepositoryPort } from "../../port/output/manage-concept.repository.port";
// import { ManageConceptUseCase } from "../manage-concept.use-case";
//
// describe("ManageConceptUseCase", () => {
//   let manageConceptUseCase: ManageConceptUseCase;
//   let manageConceptRepository: jest.Mocked<ManageConceptRepositoryPort>;
//
//   beforeEach(async () => {
//     const module: TestingModule =
//       await Test.createTestingModule({
//         providers: [
//           ManageConceptUseCase,
//           {
//             provide: "ManageConceptRepositoryPort",
//             useValue: {
//               findAll: jest.fn(),
//               findOne: jest.fn(),
//               findOneByUrl: jest.fn(),
//               remove: jest.fn(),
//             },
//           },
//         ],
//       }).compile();
//
//     manageConceptUseCase = module.get<ManageConceptUseCase>(
//       ManageConceptUseCase,
//     );
//     manageConceptRepository =
//       module.get<ManageConceptRepositoryPort>(
//         "ManageConceptRepositoryPort",
//       );
//   });
//
//   it("findAll() 호출 시 저장된 개념 목록을 반환해야 한다.", async () => {
//     // Given: Mock Repository에서 반환할 데이터 정의
//     const mockConcepts: ConceptDomain[] = [
//       new ConceptDomain(
//         1,
//         "React",
//         "Frontend",
//         "https://example.com/react",
//       ),
//       new ConceptDomain(
//         2,
//         "NestJS",
//         "Backend",
//         "https://example.com/nestjs",
//       ),
//     ];
//     manageConceptRepository.findAll.mockResolvedValue(
//       mockConcepts,
//     );
//
//     // When: Use Case 실행
//     const result = await manageConceptUseCase.findAll(
//       new GetConceptListRequestDto(),
//     );
//
//     // Then: 올바른 데이터가 반환되는지 검증
//     expect(result).toEqual(mockConcepts);
//     expect(
//       manageConceptRepository.findAll,
//     ).toHaveBeenCalledTimes(1);
//   });
//
//   it("findOne() 호출 시 존재하는 개념을 반환해야 한다.", async () => {
//     // Given
//     const concept = new ConceptDomain(
//       1,
//       "React",
//       "Frontend",
//       "https://example.com/react",
//     );
//     manageConceptRepository.findOne.mockResolvedValue(
//       concept,
//     );
//
//     // When
//     const result = await manageConceptUseCase.findOne(1);
//
//     // Then
//     expect(result).toEqual(concept);
//     expect(
//       manageConceptRepository.findOne,
//     ).toHaveBeenCalledWith(1);
//   });
//
//   it("findOneByUrl() 호출 시 URL에 해당하는 개념을 반환해야 한다.", async () => {
//     // Given
//     const concept = new ConceptDomain(
//       1,
//       "NestJS",
//       "Backend",
//       "https://example.com/nestjs",
//     );
//     manageConceptRepository.findOneByUrl.mockResolvedValue(
//       concept,
//     );
//
//     // When
//     const result = await manageConceptUseCase.findOneByUrl(
//       "https://example.com/nestjs",
//     );
//
//     // Then
//     expect(result).toEqual(concept);
//     expect(
//       manageConceptRepository.findOneByUrl,
//     ).toHaveBeenCalledWith("https://example.com/nestjs");
//   });
//
//   it("remove() 호출 시 개념이 삭제되어야 한다.", async () => {
//     // Given
//     manageConceptRepository.remove.mockResolvedValue(true);
//
//     // When
//     const result = await manageConceptUseCase.remove(1);
//
//     // Then
//     expect(result).toBe(true);
//     expect(
//       manageConceptRepository.remove,
//     ).toHaveBeenCalledWith(1);
//   });
// });
