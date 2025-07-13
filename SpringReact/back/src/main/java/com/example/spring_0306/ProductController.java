package com.example.spring_0306;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    //전 제품 조회
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    //제품 추가
    @PostMapping(consumes = "multipart/form-data")
    public Product createProduct(@RequestParam("title") String title,
                                 @RequestParam("price") String price,
                                 @RequestParam("description") String description,
                                 @RequestParam("location") String location,
                                 @RequestParam("image") MultipartFile image) throws IOException
    {

        //이미지 저장
        String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
        String filepath = UPLOAD_DIR + filename;
        File findest = new File(filepath);
        findest.getParentFile().mkdirs();
        image.transferTo(findest);

        //Product 객체
        Product product = new Product();
        product.setTitle(title);
        product.setPrice(price);
        product.setDescription(description);
        product.setLocation(location);
        product.setImagePath("/uploads/"+filename);

        return productRepository.save(product);
    }

    //제품 삭제
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }


    //제품 수정
    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public Product updateProduct(@PathVariable Long id,
                                 @RequestParam("title") String title,
                                 @RequestParam("price") String price,
                                 @RequestParam("description") String description,
                                 @RequestParam("location") String location,
                                 @RequestParam(value = "image", required = false) MultipartFile image) throws IOException
    {
        Product product = productRepository.findById(id).orElseThrow();

        //기존 밸류
        product.setTitle(title);
        product.setPrice(price);
        product.setDescription(description);
        product.setLocation(location);

        //이미지파일이 존재하면 업데이트
        if(image != null && !image.isEmpty()){
            //새로운 경로 지정 && 저장
            String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
            String filepath = UPLOAD_DIR + filename;
            File findest = new File(filepath);
            findest.getParentFile().mkdirs();
            image.transferTo(findest);
            product.setImagePath("/uploads/"+filename);
        }

        return productRepository.save(product);
    }


}
